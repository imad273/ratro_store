import React from 'react'
import productImg1 from "@/assets/product-1.jpg";
import productImg2 from "@/assets/product-2.jpg";
import productImg3 from "@/assets/product-3.jpg";
import productImg4 from "@/assets/product-4.jpg";
import { Product } from '@/components';

const page = () => {
  return (
    <main>
      <section className='blured'>
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
      </section>

      <section>
        <div className="container">
          <h1 className="text-headingText text-4xl text-center font-semibold py-5">All Products</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-6">
            <Product img={productImg1} name={"Unspel"} discount={false} discountPrice={0} price={29.99} />
            <Product img={productImg2} name={"CyberEar"} discount={true} discountPrice={29.99} price={49.99} />
            <Product img={productImg3} name={"Viseput"} discount={false} discountPrice={0} price={89.99} />
            <Product img={productImg4} name={"Neon Pack"} discount={true} discountPrice={59.99} price={79.99} />
          </div>
        </div>
      </section>
    </main>
  )
}

export default page