"use client"

import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useCart from '@/zustand/cart';
import ProductPreviewSkeleton from '@/components/loading/productPreviewSkeleton';
import EmptyProducts from '@/components/emptyAlerts/EmptyProducts';
import Link from 'next/link';
import { motion } from 'framer-motion'
import supabase from '@/lib/supabaseClient';

const Page = () => {
  const { isLoading, productsCart, removeItem, updateQuantity } = useCart();

  let storedCart: any = "";
  if (typeof window !== 'undefined') {
    storedCart = localStorage.getItem('cart');
  }

  const remove = (id: number) => {
    // remove the product from local storage first
    if (storedCart) {
      let parse = JSON.parse(storedCart);
      const newCartData = parse.filter((item: any) => item.product.id !== id)
      localStorage.setItem('cart', JSON.stringify(newCartData));
    }

    removeItem(id);
  }

  const quantityUpdateFun = (productId: number, action: "increase" | "decrease") => {

    // update the quantity on local storage
    if (storedCart) {
      let parse = JSON.parse(storedCart);
      const updatedCart = parse.map((product: any) => {
        if (product.product.id === productId) {
          const newQuantity = product.quantity + (action === 'increase' ? 1 : -1);
          return { ...product, quantity: Math.max(newQuantity, 0) };
        }
        return product;
      });

      const filteredCart = updatedCart.filter((product: any) => product.quantity > 0);
      localStorage.setItem('cart', JSON.stringify(filteredCart));
    }

    updateQuantity(productId, action)
  }

  const calculateSubtotal = () => {
    const subtotal = productsCart.reduce((total, product) => {
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

  const [settingsLoading, setSettingsLoading] = useState(true)
  const [showDiscountField, setShowDiscountField] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select()

      if (!error) {
        setShowDiscountField(data[0].showDiscountsCoupons)
        setSettingsLoading(false)
      }
    }

    fetchSettings();
  }, [])

  return (
    <main>
      {isLoading || settingsLoading ?
        <section className='container min-h-[80vh] space-y-3 my-6'>
          <ProductPreviewSkeleton />
          <ProductPreviewSkeleton />
        </section>
        :
        productsCart.length === 0 ?
          <EmptyProducts from='cart' />
          :
          <section className='container min-h-screen gap-5 py-8 md:grid md:grid-cols-3'>
            <div className='flex flex-col col-span-2'>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  ease: "easeOut",
                  duration: 0.5
                }}
              >

                <div className="grid w-full grid-cols-4 gap-2 md:grid-cols-5">
                  <div className='col-span-2'>
                    <p className='text-sm font-semibold text-gray-500 uppercase md:text-base'>
                      Product
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-gray-500 uppercase md:text-base'>
                      Quantity
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-semibold text-center text-gray-500 uppercase md:text-base'>
                      Price
                    </p>
                  </div>
                </div>

                <hr className="h-px my-3 bg-gray-300 border-none" />


                {productsCart.map(product => (
                  <div key={product.product.id}>
                    <div>
                      <div className="grid items-center w-full grid-cols-4 gap-2 md:grid-cols-5">
                        <div className='col-span-2'>
                          <div className='flex items-center gap-3'>
                            <img src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${product.product.images[0]}`} className='w-20 h-16 rounded-md' alt="product" />

                            <div>
                              <h3 className='font-semibold text-headingText'>{product.product.name}</h3>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className='inline-flex items-center py-1.5 border rounded-md'>
                            <div className='px-2.5 text-base font-semibold cursor-pointer md:px-4 md:text-xl text-headingText rounded-r-md' onClick={() => quantityUpdateFun(product.product.id, "decrease")}>-</div>
                            <div className='h-full px-3 font-semibold md:px-5 text-headingText'>{product.quantity}</div>
                            <div className='px-2.5 text-base font-semibold cursor-pointer md:px-4 md:text-xl text-headingText rounded-l-md' onClick={() => quantityUpdateFun(product.product.id, "increase")}>+</div>
                          </div>
                        </div>

                        <div className='font-semibold text-center text-headingText'>
                          ${product.product.discount ? product.product.discountPrice * product.quantity : product.product.price * product.quantity}
                        </div>
                      </div>

                      <div onClick={() => remove(product.product.id)} className='inline-flex items-center gap-2 my-3 text-sm font-semibold text-red-500 cursor-pointer md:text-base'>
                        <FaTrashAlt />
                        remove
                      </div>
                    </div>
                    <hr className="h-px my-3 bg-gray-300 border-none" />
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                ease: "easeOut",
                duration: 0.5
              }}
            >
              <div>
                <div className='px-4 py-3 border rounded-md'>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold text-gray-500'>Subtotal</h3>
                    <p className='font-semibold text-headingText'>${calculateSubtotal()}</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold text-gray-500'>Shipping</h3>
                    <p className='font-semibold text-headingText'>$0</p>
                  </div>
                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold text-gray-500'>Tax</h3>
                    <p className='font-semibold text-headingText'>$0</p>
                  </div>

                  {showDiscountField === true &&
                    <>
                      <div className='py-3'>
                        <h3 className='font-semibold text-gray-500'>Discount Code</h3>
                        <div className="flex items-center w-full space-x-2">
                          <Input className="text-gray-700" type="text" placeholder="Code" />
                          <Button className="text-white bg-main hover:bg-mainHover" type="submit">Apply</Button>
                        </div>
                      </div>

                      <div className='flex items-center justify-between pt-1'>
                        <h3 className='font-semibold text-gray-500'>Discount</h3>
                        <p className='font-semibold text-headingText'>$0</p>
                      </div>
                    </>
                  }

                  <hr className="h-px my-3 bg-gray-300 border-none" />

                  <div className='flex items-center justify-between'>
                    <h3 className='font-semibold text-gray-500'>Total</h3>
                    <p className='font-semibold text-headingText'>${calculateTotal()}</p>
                  </div>

                  <div className='pt-3'>
                    <Link href="/checkout">
                      <Button className='w-full'>Checkout</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
      }
    </main>
  )
}

export default Page