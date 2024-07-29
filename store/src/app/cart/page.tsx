import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import Image from "next/image";
import productImg1 from "@/assets/product-1.jpg";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <main>
      <section className='min-h-screen container py-8'>
        <div className='flex flex-col'>
          <div className="grid grid-cols-5 gap-2 w-full">
            <div className='col-span-3'>
              <p className='uppercase text-gray-500 font-semibold'>
                Product
              </p>
            </div>
            <div>
              <p className='uppercase text-gray-500 font-semibold'>
                Quantity
              </p>
            </div>
            <div>
              <p className='uppercase text-gray-500 font-semibold'>
                Price
              </p>
            </div>
          </div>

          <hr className="h-px my-3 bg-gray-300 border-none" />

          <div>

            <div className="grid grid-cols-5 gap-2 items-center w-full">
              <div className='col-span-3'>
                <div className='flex items-center gap-3'>
                  <Image src={productImg1} className='w-20' alt="product" />

                  <div>
                    <h3 className='text-xl text-headingText'>Unspel</h3>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className='inline-flex items-center my-1 py-2 border rounded-md'>
                    <div className='px-4 text-xl text-headingText font-semibold rounded-r-md cursor-pointer'>-</div>
                    <div className='px-5 h-full text-headingText font-semibold'>1</div>
                    <div className='px-4 text-xl text-headingText font-semibold rounded-l-md cursor-pointer'>+</div>
                  </div>
                </div>
              </div>

              <div className='text-headingText font-semibold text-center'>
                $25
              </div>
            </div>

            <div className='my-3 inline-flex items-center gap-2 text-red-500 font-semibold cursor-pointer'>
              <FaTrashAlt />
              remove
            </div>
          </div>

          <hr className="h-px my-3 bg-gray-300 border-none" />

          <div>

            <div className="grid grid-cols-5 gap-2 items-center w-full">
              <div className='col-span-3'>
                <div className='flex items-center gap-3'>
                  <Image src={productImg1} className='w-20' alt="product" />

                  <div>
                    <h3 className='text-xl text-headingText'>Unspel</h3>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className='inline-flex items-center my-1 py-2 border rounded-md'>
                    <div className='px-4 text-xl text-headingText font-semibold rounded-r-md cursor-pointer'>-</div>
                    <div className='px-5 h-full text-headingText font-semibold'>1</div>
                    <div className='px-4 text-xl text-headingText font-semibold rounded-l-md cursor-pointer'>+</div>
                  </div>
                </div>
              </div>

              <div className='text-headingText font-semibold text-center'>
                $25
              </div>
            </div>

            <div className='my-3 inline-flex items-center gap-2 text-red-500 font-semibold cursor-pointer'>
              <FaTrashAlt />
              remove
            </div>
          </div>
        </div>


        <div className='border my-10 rounded-md px-4 py-3'>
          <div>
            <div className='flex justify-between items-center'>
              <h3 className='text-gray-500 font-semibold'>Subtotal</h3>
              <p className='font-semibold text-headingText'>$25</p>
            </div>
            <div className='flex justify-between items-center'>
              <h3 className='text-gray-500 font-semibold'>Shipping</h3>
              <p className='font-semibold text-headingText'>$0</p>
            </div>
            <div className='py-3'>
              <h3 className='text-gray-500 font-semibold'>Discount Code</h3>
              <div className="flex w-full items-center space-x-2">
                <Input className="text-gray-700" type="text" placeholder="Code" />
                <Button className="bg-main text-white hover:bg-mainHover" type="submit">Subscribe</Button>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <h3 className='text-gray-500 font-semibold'>Discount</h3>
              <p className='font-semibold text-headingText'>$5</p>
            </div>

            <div className='py-3'>
              <Button className='w-full'>Checkout</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page