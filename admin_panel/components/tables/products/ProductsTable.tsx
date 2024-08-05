'use client';
import { CellAction } from './cell-action';
import { ProductProps } from '@/types/products.types';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

interface TableProps {
  data: ProductProps[];
}

const ProductsTable = ({ data }: TableProps) => {

  const columns: any[] = [
    {
      header: 'Name'
    },
    {
      header: 'Price'
    },
    {
      header: 'Status',
    },
    {
      header: 'Actions',
    }
  ];

  return (
    <>
      <Input
        placeholder={`Search Products...`}
        className="w-full md:max-w-sm"
      />

      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)]">
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
              data.map((product) => (
                <TableRow
                  key={product.id}
                >
                  <TableCell>
                    {product.name}
                  </TableCell>
                  <TableCell>
                    ${product.price}
                  </TableCell>
                  <TableCell>
                    {product.availability ? "available" : "unavailable"}
                  </TableCell>
                  <TableCell>
                    <CellAction />
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
      <div className="flex items-center justify-end py-4 space-x-2">
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
      </div>
    </>
  )
}

export default ProductsTable