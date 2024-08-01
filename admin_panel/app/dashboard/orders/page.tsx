"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import OrdersTable from '@/components/tables/orders/OrdersTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderProps } from '@/types/orders.types';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Orders', link: '/dashboard/orders' }
];

export default function page() {
  const router = useRouter();

  const orders: OrderProps[] = [
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
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        </div>
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>
      <Separator />

      <OrdersTable data={orders} />
    </div>
  );
}
