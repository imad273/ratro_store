"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import TableSkeleton from '@/components/loading/tableSkeleton';
import OrdersTable from '@/components/tables/orders/OrdersTable';
import { Separator } from '@/components/ui/separator';
import supabase from '@/lib/supabaseClient';
import { OrdersProps } from '@/types/orders.types';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Orders', link: '/dashboard/orders' }
];

export default function page() {
  const [ordersData, setOrdersData] = useState<OrdersProps[]>([])
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select()

      if (!error) {
        setOrdersData(data);
        setIsLoading(false)
      }
    }

    fetchOrders();
  }, [])

  useEffect(() => {
    console.log(ordersData);
  }, [ordersData])


  return (
    <div className="space-y-2">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        </div>

        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button> */}

      </div>
      <Separator />

      {loading ?
        <TableSkeleton />
        :
        <OrdersTable data={ordersData} setOrdersData={setOrdersData} />
      }
    </div>
  );
}
