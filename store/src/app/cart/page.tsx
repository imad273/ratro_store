"use client"
import React, { useEffect } from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import productImg1 from "@/assets/product-1.jpg";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useCart from '@/zustand/cart';
import ProductPreviewSkeleton from '@/components/loading/productPreviewSkeleton';
import EmptyProducts from '@/components/emptyAlerts/EmptyProducts';
import Link from 'next/link';

const page = () => {
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

  return (
    <main>
      {isLoading === true ?
        <section className='container min-h-[80vh] space-y-3 my-6'>
          <ProductPreviewSkeleton />
          <ProductPreviewSkeleton />
        </section>
        :
        productsCart.length === 0 ?
          <EmptyProducts from='cart' />
          :
          <section className='min-h-screen md:grid md:grid-cols-3 gap-5 container py-8'>
            <div className='flex flex-col col-span-2'>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2 w-full">
                <div className='col-span-2'>
                  <p className='uppercase text-sm md:text-base text-gray-500 font-semibold'>
                    Product
                  </p>
                </div>
                <div>
                  <p className='uppercase text-sm md:text-base text-gray-500 font-semibold'>
                    Quantity
                  </p>
                </div>
                <div>
                  <p className='uppercase text-sm md:text-base text-gray-500 font-semibold text-center'>
                    Price
                  </p>
                </div>
              </div>

              <hr className="h-px my-3 bg-gray-300 border-none" />

              <>
                {productsCart.map(product => (
                  <div key={product.product.id}>
                    <div>
                      <div className="grid grid-cols-4 md:grid-cols-5 gap-2 items-center w-full">
                        <div className='col-span-2'>
                          <div className='flex items-center gap-3'>
                            <img src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${product.product.images[0]}`} className='w-20 h-16 rounded-md' alt="product" />

                            <div>
                              <h3 className='text-headingText font-semibold'>{product.product.name}</h3>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className='inline-flex items-center py-1.5 border rounded-md'>
                            <div className='px-3 md:px-4 text-base md:text-xl text-headingText font-semibold rounded-r-md cursor-pointer' onClick={() => quantityUpdateFun(product.product.id, "decrease")}>-</div>
                            <div className='px-4 md:px-5 h-full text-headingText font-semibold'>{product.quantity}</div>
                            <div className='px-3 md:px-4 text-base md:text-xl text-headingText font-semibold rounded-l-md cursor-pointer' onClick={() => quantityUpdateFun(product.product.id, "increase")}>+</div>
                          </div>
                        </div>

                        <div className='text-headingText font-semibold text-center'>
                          ${product.product.discount ? product.product.discountPrice * product.quantity : product.product.price * product.quantity}
                        </div>
                      </div>

                      <div onClick={() => remove(product.product.id)} className='text-sm md:text-base my-3 inline-flex items-center gap-2 text-red-500 font-semibold cursor-pointer'>
                        <FaTrashAlt />
                        remove
                      </div>
                    </div>
                    <hr className="h-px my-3 bg-gray-300 border-none" />
                  </div>
                ))}
              </>
            </div>

            <div>
              <div className='border rounded-md px-4 py-3'>
                <div className='flex justify-between items-center'>
                  <h3 className='text-gray-500 font-semibold'>Subtotal</h3>
                  <p className='font-semibold text-headingText'>${calculateSubtotal()}</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h3 className='text-gray-500 font-semibold'>Shipping</h3>
                  <p className='font-semibold text-headingText'>$0</p>
                </div>
                <div className='flex justify-between items-center'>
                  <h3 className='text-gray-500 font-semibold'>Tax</h3>
                  <p className='font-semibold text-headingText'>$0</p>
                </div>
                <div className='py-3'>
                  <h3 className='text-gray-500 font-semibold'>Discount Code</h3>
                  <div className="flex w-full items-center space-x-2">
                    <Input className="text-gray-700" type="text" placeholder="Code" />
                    <Button className="bg-main text-white hover:bg-mainHover" type="submit">Apply</Button>
                  </div>
                </div>

                <div className='flex justify-between items-center pt-1'>
                  <h3 className='text-gray-500 font-semibold'>Discount</h3>
                  <p className='font-semibold text-headingText'>$0</p>
                </div>

                <hr className="h-px my-3 bg-gray-300 border-none" />

                <div className='flex justify-between items-center'>
                  <h3 className='text-gray-500 font-semibold'>Total</h3>
                  <p className='font-semibold text-headingText'>${calculateTotal()}</p>
                </div>

                <div className='pt-3'>
                  <Link href="/checkout">
                    <Button className='w-full'>Checkout</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
      }
    </main>
  )
}

export default page