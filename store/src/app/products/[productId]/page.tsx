"use client"

import React, { useEffect, useState } from 'react'
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
import supabase from '@/lib/supabaseClient';
import ProductPreviewSkeleton from '@/components/loading/productPreviewSkeleton';
import TextSkeleton from '@/components/loading/textSkeleton';
import { TbPackageOff } from 'react-icons/tb';
import { ProductProps } from '@/types/products.types';
import Link from 'next/link';
import useCart from '@/zustand/cart';
import { toast } from '@/components/ui/use-toast';

interface Props {
  params: {
    productId: number
  }
}

const Page = ({ params }: Props) => {
  const [productData, setProductData] = useState<ProductProps>()
  const [loading, setIsLoading] = useState<boolean>(true)
  const [selectedImage, setSelectedImage] = useState<string>("")

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', params.productId)

      if (!error) {
        setProductData(data[0]);
        setSelectedImage(data[0].images[0]);
        setIsLoading(false)
      }
    }

    fetchProducts();
  }, [])

  const [quantity, setQuantity] = useState<number>(1);

  const { productsCart, addItem } = useCart();

  const handleAddToCart = (product: ProductProps) => {
    let productAlreadyIn = productsCart.some(item => item.product.id === product.id);
    if (productAlreadyIn === true) {
      toast({
        variant: 'destructive',
        title: 'Product already in cart.',
        description: 'Visit the cart page to check it'
      });

      return
    }

    addItem(product, quantity);

    localStorage.setItem('cart', JSON.stringify([
      ...productsCart,
      {
        product: product,
        quantity: quantity
      }
    ]));

    toast({
      variant: 'success',
      title: 'Product Added to the cart',
      description: 'Visit the cart page to check it out'
    });
  };

  return (
    <main>
      {loading ?
        <div className='my-8 md:my-0 container gap-14 min-h-[80vh] flex flex-col justify-center'>
          <ProductPreviewSkeleton />
          <TextSkeleton />
        </div>
        :
        <>
          <section className='min-h-screen container'>
            <div className='flex flex-col md:flex-row gap-6 py-8'>
              <div className='md:w-3/6'>
                <div>

                  <h1 className='mb-6 md:hidden text-3xl text-headingText font-semibold'>{productData?.name}</h1>

                  {selectedImage === "" ?
                    <img src={`https://placehold.co/600x400/3c10cc/FFF`} alt='product' className='w-full rounded' />
                    :
                    <img src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${selectedImage}`} alt='product' className='w-full rounded' />
                  }
                </div>
                <div className='flex items-center gap-2 pt-3'>
                  {productData?.images.map(image => (
                    <div key={image} className='relative cursor-pointer overflow-hidden border-[3px] border-main rounded-3xl' onClick={() => setSelectedImage(image)}>
                      {selectedImage !== image && <div className='absolute w-full h-full bg-white/60'></div>}
                      <Image className='w-16 h-16 m-1 rounded-2xl' width={64} height={64} alt='product image' src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${image}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className='md:w-3/6'>
                <h1 className='hidden md:block text-4xl text-headingText font-semibold'>{productData?.name}</h1>

                {productData?.discount === true ?
                  <div className="py-3 flex items-center justify-end gap-2">
                    <p className="line-through">${productData?.price}</p>
                    <p className="text-2xl text-headingText font-semibold">${productData?.discountPrice}</p>
                  </div>
                  :
                  <div className="py-3 flex items-center justify-end">
                    <p className="text-2xl text-headingText font-semibold">${productData?.price}</p>
                  </div>
                }

                <div className='py-3'>
                  <p className='text-sm text-gray-700 custom-truncate'>{productData?.shortDescription}</p>
                  <Link href="#description" className='text-main text-sm cursor-pointer font-semibold'>view all description</Link>
                </div>

                <div className='grid grid-cols-3 gap-2 py-3'>
                  <div className='flex flex-col items-center gap-2'>
                    <FaTruckFast size={20} className='text-gray-500' />
                    <p className="text-center">
                      Free Shipping
                    </p>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    {productData?.availability ?
                      <FaClipboardCheck size={20} className='text-gray-500' />
                      :
                      <TbPackageOff size={20} className='text-red-500' />
                    }
                    <p className="text-center">
                      {productData?.availability ?
                        "In Stock"
                        :
                        "Out Of Stock"
                      }
                    </p>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <FaShieldAlt size={20} className='text-gray-500' />
                    <p className="text-center">
                      Secure Checkout
                    </p>
                  </div>
                </div>

                {productData?.options && productData?.options.length > 0 &&
                  productData?.options.map((option, index) => (
                    <div className='my-3' key={index}>
                      <span>
                        {option.optionName}
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
                            {option.optionValue.map((value, index) => (
                              <DropdownMenuGroup key={index}>
                                <DropdownMenuItem>
                                  <span>{value}</span>
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                }

                <div className='my-3'>
                  <span>
                    Quantity
                  </span>
                  <div>
                    <div className='inline-flex items-center my-1 py-2 border rounded-md'>
                      <div className='px-5 text-xl text-headingText font-semibold rounded-r-md cursor-pointer' onClick={() => setQuantity(quantity - 1)}>-</div>
                      <div className='px-5 h-full text-headingText font-semibold'>{quantity}</div>
                      <div className='px-5 text-xl text-headingText font-semibold rounded-l-md cursor-pointer' onClick={() => setQuantity(quantity + 1)}>+</div>
                    </div>
                  </div>
                </div>

                <div>
                  <Button onClick={() => productData && handleAddToCart(productData)} disabled={!productData?.availability} className='w-full gap-2'>
                    <FaCartShopping />
                    Add To Cart
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className='min-h-screen container' id='description'>
            <div className='py-8'>
              <div className='font-semibold mb-2'>
                <h3 className='inline text-headingText'>Shipping: </h3>
                <p className='inline text-red-600'>
                  Expect 2-4 weeks for items to arrive (to be safe).
                </p>
              </div>

              <div className='py-6' id='description' dangerouslySetInnerHTML={{ __html: productData !== undefined ? productData?.description : "" }}></div>
            </div>
          </section>
        </>
      }
    </main>
  )
}

export default Page