"use client"

import StripeCheckoutForm from '@/components/stripe/stripeCheckoutform';
import convertToSubcurrency from '@/lib/convertToSubcurrency';
import supabase from '@/lib/supabaseClient';
import { OrdersProps } from '@/types/orders.types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react'

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined")
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Page = ({ params }: { params: { orderId: string } }) => {

  const [orderData, setOrderData] = useState<OrdersProps>();

  useEffect(() => {
    const fetchOrderData = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select()
        .eq('id', params.orderId)

      if (!error) {
        setOrderData(data[0]);
      }
    }

    fetchOrderData();
  }, [])


  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    orderData !== undefined &&
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertToSubcurrency(orderData?.total_amount) }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
  }, [orderData]);

  const options = {
    clientSecret,
    appearance: {
      theme: 'flat',
      variables: {
        colorPrimary: '#3c10cc',
      }
    }
  };

  return (
    <section className='min-h-[85vh] container flex justify-center items-center'>
      <div className='w-full md:w-5/6 py-5'>
        {clientSecret &&
          /* @ts-ignore */
          <Elements options={options} stripe={stripePromise}>
            <StripeCheckoutForm orderData={orderData} />
          </Elements>
        }
      </div>
    </section>
  )
}

export default Page