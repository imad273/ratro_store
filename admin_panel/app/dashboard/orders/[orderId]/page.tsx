"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import ViewSkeleton from '@/components/loading/viewSkeleton';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import supabase from '@/lib/supabaseClient';
import { OrdersProps } from '@/types/orders.types';
import { Mail, Phone, ShoppingBasket, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';


const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Orders', link: '/dashboard/orders' },
  { title: 'View', link: '/dashboard/orders/view' }
];
export default function Page({ params }: { params: { orderId: string } }) {

  const { toast } = useToast();
  const [orderData, setOrderData] = useState<OrdersProps>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('orders')
        .select()
        .eq('id', params.orderId)
        .maybeSingle()

      if (!error) {
        setOrderData(data)
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.'
        });
      }

      setLoading(false);
    }

    fetchOrders()
  }, [])

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);

    // Extract parts of the date
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' }); // "September"
    const year = date.getFullYear();

    // Format hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert 24-hour format to 12-hour format
    hours = hours % 12 || 12;

    // Return the formatted date
    return `${day} ${month}, ${year} at ${hours}:${minutes}${ampm}`;
  }

  const calculateSubtotal = () => {
    const subtotal = orderData?.products.reduce((total, product) => {
      if (product.product.discount === true) {
        return total + product.product.discountPrice * product.quantity;
      }

      return total + product.product.price * product.quantity;
    }, 0);

    return subtotal;
  }

  const calculateTotal = () => {
    return calculateSubtotal();
  }

  if (loading === true) return <ViewSkeleton />

  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />

      <Separator />

      <div>
        <div className='flex items-center gap-3'>
          <h3 className='text-2xl font-semibold'>#{orderData?.order_number}</h3>
          {orderData?.order_status === "pending" ?
            <p className='px-2 font-semibold text-orange-600 bg-orange-200 rounded-md'>Pending</p>
            :
            <p className='px-2 font-semibold text-green-600 bg-green-200 rounded-md'>Paid</p>
          }
        </div>
        <p className='pt-2'>{orderData?.created_at && parseDate(orderData?.created_at)}</p>
      </div>

      <Separator />

      <div className='grid grid-cols-2 gap-3'>
        <div>
          <h3 className='text-xl font-semibold'>Customer</h3>

          <div className='mt-3.5 space-y-2'>
            <div className='flex items-center gap-3'>
              <User size={22} />
              <span>{orderData?.customer_name}</span>
            </div>
            <div className='flex items-center gap-3'>
              <ShoppingBasket size={22} />
              <span>{orderData?.products.reduce((total, order) => total + order.quantity, 0)} Products</span>
            </div>
          </div>
        </div>


        <div>
          <h3 className='text-xl font-semibold'>Contact Information</h3>

          <div className='mt-3.5 space-y-2'>
            <div className='flex items-center gap-3'>
              <Mail size={22} />
              <span>{orderData?.customer_email}</span>
            </div>
            <div className='flex items-center gap-3'>
              <Phone size={22} />
              <span>{orderData?.customer_phone_number}</span>
            </div>
          </div>
        </div>

        <Separator className='col-span-2 my-3' />
        <div className='col-span-2'>
          <h3 className='text-xl font-semibold'>Shipping Address</h3>

          <div className='mt-3.5'>
            <p>{orderData?.shipping_address}</p>
            <p>{orderData?.customer_state}, {orderData?.customer_zipcode}</p>
            <p>{orderData?.customer_country}</p>
          </div>
        </div>
      </div>
      <Separator />

      <div>
        <h3 className='text-xl font-semibold'>Products List</h3>

        <div className="py-4">
          {orderData?.products.map(product => (
            <div key={product.product.id} className="flex gap-5">
              <div>
                <img
                  src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${product.product.images[0]}`}
                  className='w-16 h-16 rounded-md'
                  alt="product"
                />
              </div>
              <div className='flex-1'>
                <h4 className='font-semibold truncate text-headingText'>{product.product.name}</h4>
                <p className='text-sm font-semibold text-gray-400'>x{product.quantity}</p>
                <p className='flex justify-end font-semibold'>${product.product.discount ? product.product.discountPrice * product.quantity : product.product.price * product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='py-3'>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-gray-300'>Subtotal</h3>
          <p className='font-semibold text-headingText'>${calculateSubtotal()}</p>
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-gray-300'>Shipping</h3>
          <p className='font-semibold text-headingText'>$0</p>
        </div>
        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-gray-300'>Tax</h3>
          <p className='font-semibold text-headingText'>$0</p>
        </div>

        <div className='flex items-center justify-between pt-1'>
          <h3 className='font-semibold text-gray-300'>Discount</h3>
          <p className='font-semibold text-headingText'>$0</p>
        </div>

        <Separator className='my-2' />

        <div className='flex items-center justify-between'>
          <h3 className='font-semibold text-gray-300'>Total</h3>
          <p className='font-semibold text-headingText'>${calculateTotal()}</p>
        </div>
      </div>
    </div>
  );
}
