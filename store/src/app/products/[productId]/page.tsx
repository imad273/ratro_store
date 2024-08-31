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
import { motion } from 'framer-motion';

interface Props {
  params: {
    productId: number
  }
}

type OptionsProps = {
  option: string,
  value: string
}

const Page = ({ params }: Props) => {
  const [productData, setProductData] = useState<ProductProps>()
  const [loading, setIsLoading] = useState<boolean>(true)
  const [selectedImage, setSelectedImage] = useState<string>("")
  const [selectedOptions, setSelectedOptions] = useState<OptionsProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()
        .eq('id', params.productId)

      if (!error) {
        setProductData(data[0]);
        setSelectedImage(data[0].images[0]);

        const optionsArr: OptionsProps[] = [];

        if (data[0].options && data[0].options.length > 0) {
          data[0].options.map((option: any) => {
            optionsArr.push(
              {
                option: option.optionName,
                value: option.optionValue[0]
              }
            )
          });

          setSelectedOptions(optionsArr)
        }

        setIsLoading(false)
      }
    }

    fetchProducts();
  }, []);

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

    addItem(product, quantity, selectedOptions);

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

  function updateOptionValue(optionName: string, newValue: string) {
    setSelectedOptions(prevOptions =>
      prevOptions.map(item =>
        item.option === optionName ? { ...item, value: newValue } : item
      )
    );
  }

  return (
    <main>
      {loading ?
        <div className='my-8 md:my-0 container gap-14 min-h-[80vh] flex flex-col justify-center'>
          <ProductPreviewSkeleton />
          <TextSkeleton />
        </div>
        :
        <>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeOut",
              duration: 0.5
            }}
          >
            <section className='container min-h-screen'>
              <div className='flex flex-col gap-6 py-8 md:flex-row'>
                <div className='md:w-3/6'>
                  <div>

                    <h1 className='mb-6 text-3xl font-semibold md:hidden text-headingText'>{productData?.name}</h1>

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
                        <Image className='w-12 h-12 m-1 rounded-2xl' width={48} height={48} alt='product image' src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${image}`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className='md:w-3/6'>
                  <h1 className='hidden text-4xl font-semibold md:block text-headingText'>{productData?.name}</h1>

                  {productData?.discount === true ?
                    <div className="flex items-center justify-end gap-2 py-3">
                      <p className="line-through">${productData?.price}</p>
                      <p className="text-2xl font-semibold text-headingText">${productData?.discountPrice}</p>
                    </div>
                    :
                    <div className="flex items-center justify-end py-3">
                      <p className="text-2xl font-semibold text-headingText">${productData?.price}</p>
                    </div>
                  }

                  <div className='py-3'>
                    <p className='text-sm text-gray-700 custom-truncate'>{productData?.shortDescription}</p>
                    <Link href="#description" className='text-sm font-semibold cursor-pointer text-main'>view all description</Link>
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
                              <Button variant="outline" className='flex items-center justify-between w-full bg-gray-50'>
                                {selectedOptions.find(item => item.option === option.optionName)?.value}
                                <IoIosArrowDown />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-full">
                              {option.optionValue.map((value, index) => (
                                <DropdownMenuGroup key={index}>
                                  <DropdownMenuItem onClick={() => updateOptionValue(option.optionName, value)}>
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
                      <div className='inline-flex items-center py-2 my-1 border rounded-md'>
                        <div className='px-5 text-xl font-semibold cursor-pointer text-headingText rounded-r-md' onClick={() => setQuantity(quantity - 1)}>-</div>
                        <div className='h-full px-5 font-semibold text-headingText'>{quantity}</div>
                        <div className='px-5 text-xl font-semibold cursor-pointer text-headingText rounded-l-md' onClick={() => setQuantity(quantity + 1)}>+</div>
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
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              ease: "easeOut",
              duration: 0.5
            }}
          >
            <section className='container min-h-screen' id='description'>
              <div className='py-8'>
                <div className='mb-2 font-semibold'>
                  <h3 className='inline text-headingText'>Shipping: </h3>
                  <p className='inline text-red-600'>
                    Expect {productData?.shippingTime} weeks for items to arrive (to be safe).
                  </p>
                </div>

                <div className='py-6' id='description' dangerouslySetInnerHTML={{ __html: productData !== undefined ? productData?.description : "" }}></div>
              </div>
            </section>
          </motion.div>
        </>
      }
    </main>
  )
}

export default Page