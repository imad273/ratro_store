import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { BiSolidMedal, BiSolidPurchaseTag } from 'react-icons/bi'
import { ProductProps } from '@/types/products.types'

interface Props {
  productData: ProductProps
}

const Product = ({ productData }: Props) => {
  return (
    <div className="border p-1 rounded flex flex-col justify-between h-full">
      <div className='flex flex-col justify-between h-full'>
        <img className="w-full h-52 md:h-48 lg:h-56 rounded" src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${productData.images[0]}`} alt="product 1" />
        <div className="mt-2 mb-1">
          <div className='flex items-center flex-wrap gap-3 '>
            {productData.availability === false &&
              <div className='flex mb-2'>
                <p className='pl-2 pr-2.5 py-1 text-xs font-semibold gap-2 text-white bg-red-600 shadow-md shadow-rose-300/40 rounded-2xl'>
                  Out of stock
                </p>
              </div>
            }

            {productData.badge === "Best seller" &&
              <div className='flex mb-2'>
                <p className='pl-2 pr-2.5 py-1 flex items-center text-xs font-semibold gap-2 text-white bg-yellow-500 shadow-md shadow-yellow-300/40 rounded-2xl'>
                  <BiSolidMedal size={18} />
                  Best Seller
                </p>
              </div>
            }
            {productData.badge === "new" &&
              <div className='flex mb-2'>
                <p className='pl-2 pr-2.5 py-1 flex items-center text-xs font-semibold gap-2 text-white bg-green-500 shadow-md shadow-yellow-300/40 rounded-2xl'>
                  <BiSolidPurchaseTag size={18} />
                  New
                </p>
              </div>
            }
          </div>

          <h2 className="truncate text-headingText text-2xl">{productData.name}</h2>
          {productData.discount ?
            <div className="pt-3 flex direction-reverse items-end justify-end gap-2">
              <p className="line-through text-sm">${productData.price}</p>
              <p className="text-xl text-headingText font-semibold">${productData.discountPrice}</p>
            </div>
            :
            <div className="pt-3">
              <p className="text-end font-semibold">${productData.price}</p>
            </div>
          }
        </div>
      </div>
      <div>
        <Link href={`/products/${productData.id}`}>
          <Button className="w-full mt-2 rounded">Buy</Button>
        </Link>
      </div>
    </div>
  )
}

export default Product