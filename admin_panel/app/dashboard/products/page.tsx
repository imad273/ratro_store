"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import ProductsTable from '@/components/tables/products/ProductsTable';
import { ProductProps } from '@/types/products.types';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import supabase from '@/lib/supabaseClient';
import TableSkeleton from '@/components/loading/tableSkeleton';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Products', link: '/dashboard/products' }
];

const page = () => {

  const [productsData, setProductsData] = useState<ProductProps[]>([])
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()

      if (!error) {
        setProductsData(data);
        setIsLoading(false)
      }
    }

    fetchProducts();
  }, [])

  return (
    <div className="space-y-2">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        </div>
        <Link href={`/dashboard/products/create`}>
          <Button className="text-xs md:text-sm">
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        </Link>
      </div>
      <Separator />

      {loading ?
        <TableSkeleton />
        :
        <ProductsTable data={productsData} setProductsData={setProductsData}/>
      }
    </div>
  )
}

export default page