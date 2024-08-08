'use client';
import { DeleteAlert } from '@/components/delete alerts models/delete-alert';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/lib/supabaseClient';
import { ProductProps } from '@/types/products.types';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  id: number
  images: string[]
  data: ProductProps[]
  setProductsData: React.Dispatch<React.SetStateAction<ProductProps[]>>
}

export const CellAction = ({ id, images, data, setProductsData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const onConfirm = async () => {
    setLoading(true)
    const response = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    const modifiedImages = images.map(image => image.replace("products_images/", ""));

    // delete images
    const { error } = await supabase
      .storage
      .from('products_images')
      .remove(modifiedImages)

    if (response && !error) {
      const updatedProducts = data.filter(product => product.id !== id);
      setProductsData(updatedProducts);
      setOpen(false)
      toast({
        variant: "success",
        description: "Product Deleted successfully",
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
        description: 'There was a problem with when delete'
      });
    }
    setLoading(false)
  };

  return (
    <>
      <DeleteAlert
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/dashboard/products/update/${id}`}>
            <DropdownMenuItem className='cursor-pointer'>
              <Edit className="w-4 h-4 mr-2" /> Update
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className='font-semibold text-red-600 cursor-pointer' onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu >
    </>
  );
};
