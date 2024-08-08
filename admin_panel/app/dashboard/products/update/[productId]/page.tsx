"use client"
import React, { useEffect, useState } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { UpdateProductForm } from '@/components/forms/products/update-product-form';
import supabase from '@/lib/supabaseClient';
import { ProductProps } from '@/types/products.types';
import { useToast } from '@/components/ui/use-toast';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Products', link: '/dashboard/products' },
  { title: 'Update', link: '/dashboard/products' }
];

const page = ({ params }: { params: { productId: string } }) => {
  const { toast } = useToast();
  const [productData, setProductData] = useState<ProductProps>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', params.productId)
        .maybeSingle()

      if (!error) {
        setProductData(data)
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        });
      }

      setLoading(false);
    }

    fetchProduct()
  }, [])

/*   useEffect(() => {
    console.log(productData);
  }, [productData]) */

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <UpdateProductForm productData={productData} fetchLoading={loading} productId={params.productId}/>
    </div>
  )
}

export default page