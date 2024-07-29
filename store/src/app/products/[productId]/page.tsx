"use client"

import React from 'react'
import productImg1 from "@/assets/product-1.jpg";
import Image from "next/image";
import { FaClipboardCheck, FaShieldAlt } from 'react-icons/fa';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IoIosArrowDown } from 'react-icons/io';
import { FaCartShopping, FaTruckFast } from 'react-icons/fa6';

const page = () => {
  return (
    <main>
      <section className='min-h-screen container'>
        <div className='flex gap-6 py-8'>
          <div className='w-3/6'>
            <Image src={productImg1} alt='product' className='rounded' />
          </div>

          <div className='w-3/6'>
            <h1 className='text-4xl text-headingText font-semibold'>Unspel</h1>

            <div className="py-3 flex items-center justify-end gap-2">
              <p className="line-through">$49.99</p>
              <p className="text-2xl text-headingText font-semibold">$29.99</p>
            </div>

            <div className='py-3'>
              <p className='text-sm text-gray-700 custom-truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde saepe totam reprehenderit ut laborum ratione alias doloribus?</p>
              <p className='text-main text-sm cursor-pointer font-semibold'>view description</p>
            </div>

            <div className='grid grid-cols-3 gap-2 py-3'>
              <div className='flex flex-col items-center gap-2'>
                <FaTruckFast size={20} className='text-gray-500' />
                Free Shipping
              </div>
              <div className='flex flex-col items-center gap-2'>
                <FaClipboardCheck size={20} className='text-gray-500' />
                In Stock
              </div>
              <div className='flex flex-col items-center gap-2'>
                <FaShieldAlt size={20} className='text-gray-500' />
                Secure Checkout
              </div>
            </div>

            <div className='my-3'>
              <span>
                color
              </span>
              <div className='w-full mt-1'>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className='flex justify-between items-center w-full bg-gray-50'>
                      Open
                      <IoIosArrowDown />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-full">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <span>Blue</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Yellow</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Green</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Black</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className='my-3'>
              <span>
                Quantity
              </span>
              <div>
                <div className='inline-flex items-center my-1 py-2 border rounded-md'>
                  <div className='px-5 text-xl text-headingText font-semibold rounded-r-md cursor-pointer'>-</div>
                  <div className='px-5 h-full text-headingText font-semibold'>1</div>
                  <div className='px-5 text-xl text-headingText font-semibold rounded-l-md cursor-pointer'>+</div>
                </div>
              </div>
            </div>

            <div>
              <Button className='w-full gap-2'>
                <FaCartShopping />
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className='min-h-screen container'>
        <div className='py-8'>
          <div className='font-semibold mb-2'>
            <h3 className='inline text-headingText'>Shipping: </h3>
            <p className='inline text-red-600'>
              Expect 2-4 weeks for items to arrive (to be safe).
            </p>
          </div>
          <h3 className='text-4xl mb-2 text-headingText font-semibold'>Description</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi incidunt voluptatum architecto sit odio provident, temporibus nisi voluptas rerum saepe aperiam quaerat consectetur ullam fugiat dicta mollitia unde sequi! Atque?</p>
        </div>
      </section>
    </main>
  )
}

export default page