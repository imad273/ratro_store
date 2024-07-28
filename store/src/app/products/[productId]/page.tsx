"use client"

import React from 'react'
import productImg1 from "@/assets/product-1.jpg";
import Image from "next/image";
import { HiOutlineTruck } from 'react-icons/hi';
import { FaClipboardCheck } from 'react-icons/fa';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreditCard, Keyboard, Settings, User } from 'lucide-react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaCartShopping, FaTruckFast } from 'react-icons/fa6';

const page = () => {
  return (
    <section className='min-h-screen container'>
      <div className='flex gap-6 py-8'>
        <div className='w-3/6'>
          <Image src={productImg1} alt='product' className='rounded' />
        </div>

        <div className='w-3/6'>
          <h1 className='text-4xl text-headingText font-semibold'>Unspel</h1>

          <div className="py-5 flex items-center justify-end gap-2">
            <p className="line-through">$49.99</p>
            <p className="text-2xl text-headingText font-semibold">$29.99</p>
          </div>

          <div>
            <p className='text-sm text-gray-700 custom-truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde saepe totam reprehenderit ut laborum ratione alias doloribus?</p>
            <p className='text-main text-sm cursor-pointer font-semibold'>view description</p>
          </div>

          <div className='flex items-center gap-2 mt-2.5'>
            <FaTruckFast size={20} className='text-gray-500' />
            Free Shipping
          </div>

          <div className='flex items-center gap-2 mt-2.5'>
            <FaClipboardCheck size={20} className='text-gray-500' />
            In Stock
          </div>

          <div className='py-3'>
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

          {/* ! Quantity here */}
          <div>
            
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
  )
}

export default page