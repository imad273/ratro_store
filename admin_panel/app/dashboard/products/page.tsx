"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import ProductsTable from '@/components/tables/products/ProductsTable';
import { ProductProps } from '@/types/products.types';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Products', link: '/dashboard/products' }
];

const page = () => {
  const router = useRouter();

  const products: ProductProps[] = [
    {
      id: 1,
      name: 'Candice Schiner',
      price: 29.99,
      status: 'Active'
    },
    {
      id: 2,
      name: 'John Doe',
      price: 29.99,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      price: 29.99,
      status: 'Active'
    },
    {
      id: 4,
      name: 'David Smith',
      price: 29.99,
      status: 'Inactive'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      price: 79.99,
      status: 'Active'
    },
    {
      id: 6,
      name: 'James Brown',
      price: 29.99,
      status: 'Active'
    },
    {
      id: 7,
      name: 'Laura White',
      price: 23.99,
      status: 'Active'
    },
    {
      id: 8,
      name: 'Michael Lee',
      price: 58.99,
      status: 'Active'
    },
    {
      id: 9,
      name: 'Olivia Green',
      price: 39.99,
      status: 'Active'
    }
  ];

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

      <ProductsTable data={products} />
    </div>
  )
}

export default page