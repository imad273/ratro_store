'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { CellAction } from './cell-action';
import { User } from '@/constants/data';

interface TableProps {
  data: User[];
}

const OrdersTable = ({ data }: TableProps) => {
  const router = useRouter();

  const columns: any[] = [
    {
      id: 'select',
      /*  header: () => (
         <Checkbox
           checked={table.getIsAllPageRowsSelected()}
           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
           aria-label="Select all"
         />
       ),
       cell: ({ row }) => (
         <Checkbox
           checked={row.getIsSelected()}
           onCheckedChange={(value) => row.toggleSelected(!!value)}
           aria-label="Select row"
         />
       ), */
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: 'name',
      header: 'NAME'
    },
    {
      accessorKey: 'company',
      header: 'COMPANY'
    },
    {
      accessorKey: 'role',
      header: 'ROLE'
    },
    {
      accessorKey: 'status',
      header: 'STATUS'
    },
    {
      id: 'actions',
      cell: () => <CellAction />
    }
  ];

  return (
    <>
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
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}

export default OrdersTable