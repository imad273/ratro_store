"use client"
import React, { useEffect, useState } from 'react'
import productImg1 from "@/assets/product-1.jpg";
import productImg2 from "@/assets/product-2.jpg";
import productImg3 from "@/assets/product-3.jpg";
import productImg4 from "@/assets/product-4.jpg";
import { Product } from '@/components';
import supabase from '@/lib/supabaseClient';
import ProductFetchSkeleton from '@/components/loading/productFetchSkeleton';
import { ProductProps } from '@/types/products.types';
import { MdNearbyError } from 'react-icons/md';

const page = () => {
  const [productsData, setProductsData] = useState<ProductProps[]>([])
  const [loading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select()

      if (!error) {
        setProductsData(data);
        setIsLoading(false)
      }
    }

    fetchProducts();
  }, [])

  /*   useEffect(() => {
      console.log(productsData);
    }, [productsData]) */

  return (
    <main>
      {/* <section className='blured'>
        <div className="container flex items-center min-h-[80vh]">
          <div className='w-full md:flex md:justify-between'>
            <div>
              <h1 className='text-headingText text-5xl font-bold pt-5'>Special Offer</h1>
              <p className='text-gray-700 max-w-md mt-6'>Lorem ipsum elit. quia! reprehenderit, vero obcaecati dolorum, error cum! Molestiae totam sit et?</p>
            </div>
            <div className='py-10 md:py-0'>
              <Product img={productImg2} name={"CyberEar"} discount={true} discountPrice={29.99} price={49.99} />
            </div>
          </div>
        </div>
      </section> */}

      <section>
        <div className="container">

          {loading ?
            <ProductFetchSkeleton />
            :
            productsData?.length === 0 ?
              <div className="flex items-center justify-center min-h-[70vh] p-5">
                <div className="text-center">
                  <div className="inline-flex p-4 bg-yellow-100 rounded-full">
                    <div className="p-4 bg-yellow-200 rounded-full text-yellow-600">
                      <MdNearbyError size={36} />
                    </div>
                  </div>
                  <h1 className="mt-5 text-3xl font-bold text-headingText lg:text-4xl">There is no products currently</h1>
                  <p className="mt-5 text-sm text-slate-600">Any Products the store add will shown here</p>
                </div>
              </div>
              :
              <>
                <h1 className="text-headingText text-4xl text-center font-semibold py-5">All Products</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
                  {productsData.map(product => (
                    <Product key={product.id} productData={product} />
                  ))}
                </div>
              </>
          }
        </div>
      </section>
    </main >
  )
}

export default page