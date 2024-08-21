'use client';
import { DeleteAlert } from '@/components/delete alerts models/delete-alert';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import supabase from '@/lib/supabaseClient';
import { OrdersProps } from '@/types/orders.types';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  id: string
  data: OrdersProps[];
  setOrdersData: React.Dispatch<React.SetStateAction<OrdersProps[]>>;
}

export const CellAction = ({ id, data, setOrdersData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => {
    setLoading(true)
    const response = await supabase
      .from('orders')
      .delete()
      .eq('id', id)

    if (response) {
      const updatedOrders = data.filter(order => order.id !== id);
      setOrdersData(updatedOrders);
      setOpen(false)
      toast({
        variant: "success",
        description: "Order Deleted successfully",
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
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/orders/${id}`)}
          >
            <Eye className="w-4 h-4 mr-2" /> View
          </DropdownMenuItem>
          <DropdownMenuItem className='font-semibold text-red-600 cursor-pointer' onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
