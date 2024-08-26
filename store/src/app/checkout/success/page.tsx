"use client"

import { Button } from '@/components/ui/button';
import supabase from '@/lib/supabaseClient';
import useCart from '@/zustand/cart';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa'

const Page = () => {
  const { isLoading, productsCart, removeItem } = useCart();

  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("redirect_status");
    const orderID = searchParams.get("orderId");

    /* 
      TODO: check if order id is valid and it's not paid
    */

    const updateStatus = async () => {
      const { error } = await supabase
        .from('orders')
        .update({ order_status: 'paid' })
        .eq('id', orderID)
    }

    if (status === "succeeded") {
      productsCart.map(product => {
        removeItem(product.product.id);
        localStorage.setItem('cart', JSON.stringify([]));
      })

      updateStatus()
    }
  }, [searchParams])

  return (
    <section className="min-h-[81vh] flex items-center justify-center  container p-5">
      <div className="text-center">
        <div className="inline-flex p-4 bg-green-100 rounded-full">
          <div className="p-4 bg-green-200 rounded-full text-green-600">
            <FaCheck size={36} />
          </div>
        </div>
        <h1 className="mt-5 text-3xl font-bold text-headingText lg:text-4xl">
          Payment Successful
        </h1>
        <p className="mt-5 text-sm text-slate-600">
          Thank you! your payment has been received, our team will reach you soon!
        </p>

        <div className='mt-5'>
          <Link href="/" >
            <Button>
              go back to home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Page