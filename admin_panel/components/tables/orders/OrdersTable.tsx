'use client';
import { CellAction } from './cell-action';
import { OrdersProps } from '@/types/orders.types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface TableProps {
  data: OrdersProps[];
  setOrdersData: React.Dispatch<React.SetStateAction<OrdersProps[]>>;
}

const OrdersTable = ({ data, setOrdersData }: TableProps) => {

  const columns: any[] = [
    {
      header: 'Order number'
    },
    {
      header: 'Total'
    },
    {
      header: 'Status'
    },
    {
      header: 'Customer Email',
    },
    {
      header: 'Customer Name',
    },
    {
      header: 'Country',
    },
    {
      header: 'Address',
    },
    {
      header: 'Products',
    }
  ];

  return (
    <>
      {/* <Input
        placeholder={`Search Products...`}
        className="w-full md:max-w-sm"
      /> */}

      <ScrollArea className="h-[calc(85vh-220px)] rounded-md border md:h-[65vh]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              {columns.map((column: { header: string }) => (
                <TableHead key={column.header}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length !== 0 ?
              data.map((order) => (
                <TableRow
                  key={order.id}
                >
                  <TableCell>
                    {order.order_number}
                  </TableCell>
                  <TableCell>
                    ${order.total_amount}
                  </TableCell>
                  <TableCell>
                    {order.order_status === "pending" ?
                      <p className='font-semibold text-amber-500'>
                        {order.order_status}
                      </p>
                      :
                      <p className='font-semibold text-green-500'>
                        {order.order_status}
                      </p>
                    }
                  </TableCell>

                  <TableCell>
                    {order.customer_email}
                  </TableCell>
                  <TableCell>
                    {order.customer_name}
                  </TableCell>
                  <TableCell>
                    {order.customer_country}
                  </TableCell>
                  <TableCell>
                    {order.shipping_address}
                  </TableCell>
                  <TableCell>
                    {order.products.length}
                  </TableCell>
                  <TableCell>
                    <CellAction data={data} setOrdersData={setOrdersData} id={order.id} />
                  </TableCell>
                </TableRow>
              ))
              :
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      {/* <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {data.length} of{' '}
          {10} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
          >
            Next
          </Button>
        </div>
      </div> */}
    </>
  )
}

export default OrdersTable