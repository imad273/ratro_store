import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import Image from "next/image";
import productImg1 from "@/assets/product-1.jpg";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const page = () => {
  return (
    <main>
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

          <div>
            <div className="grid grid-cols-4 md:grid-cols-5 gap-2 items-center w-full">
              <div className='col-span-2'>
                <div className='flex items-center gap-3'>
                  <Image src={productImg1} className='w-20' alt="product" />

                  <div>
                    <h3 className='text-lg md:text-xl text-headingText'>Unspel</h3>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className='inline-flex items-center py-1.5 border rounded-md'>
                    <div className='px-3 md:px-4 text-base md:text-xl text-headingText font-semibold rounded-r-md cursor-pointer'>-</div>
                    <div className='px-4 md:px-5 h-full text-headingText font-semibold'>1</div>
                    <div className='px-3 md:px-4 text-base md:text-xl text-headingText font-semibold rounded-l-md cursor-pointer'>+</div>
                  </div>
                </div>
              </div>

              <div className='text-headingText font-semibold text-center'>
                $25
              </div>
            </div>

            <div className='text-sm md:text-base my-3 inline-flex items-center gap-2 text-red-500 font-semibold cursor-pointer'>
              <FaTrashAlt />
              remove
            </div>
          </div>

          <hr className="h-px my-3 bg-gray-300 border-none" />

          <div>

            <div className="grid grid-cols-4 md:grid-cols-5 gap-2 items-center w-full">
              <div className='col-span-2'>
                <div className='flex items-center gap-3'>
                  <Image src={productImg1} className='w-20' alt="product" />

                  <div>
                    <h3 className='text-lg md:text-xl text-headingText'>Unspel</h3>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <div className='inline-flex items-center py-1.5 border rounded-md'>
                    <div className='px-3 md:px-4 text-base md:text-xl text-headingText font-semibold rounded-r-md cursor-pointer'>-</div>
                    <div className='px-4 md:px-5 h-full text-headingText font-semibold'>1</div>
                    <div className='px-3 md:px-4 text-base md:text-xl text-headingText font-semibold rounded-l-md cursor-pointer'>+</div>
                  </div>
                </div>
              </div>

              <div className='text-headingText font-semibold text-center'>
                $25
              </div>
            </div>

            <div className='text-sm md:text-base my-3 inline-flex items-center gap-2 text-red-500 font-semibold cursor-pointer'>
              <FaTrashAlt />
              remove
            </div>
          </div>

          <hr className="h-px my-3 bg-gray-300 border-none" />
        </div>

        <div>
          <div className='border rounded-md px-4 py-3'>
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
                <Button className="bg-main text-white hover:bg-mainHover" type="submit">Apply</Button>
              </div>
            </div>

            <div className='flex justify-between items-center pt-1'>
              <h3 className='text-gray-500 font-semibold'>Discount</h3>
              <p className='font-semibold text-headingText'>$5</p>
            </div>

            <hr className="h-px my-3 bg-gray-300 border-none" />

            <div className='flex justify-between items-center'>
              <h3 className='text-gray-500 font-semibold'>Total</h3>
              <p className='font-semibold text-headingText'>$20</p>
            </div>

            <div className='pt-3'>
              <Button className='w-full'>Checkout</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page