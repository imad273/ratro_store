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
    <div className="flex flex-col justify-between h-full p-1 border rounded">
      <div className='flex flex-col justify-between h-full'>
        <Link href={`/products/${productData.id}`}>
          <img className="w-full rounded h-72 md:h-48 lg:h-56" src={`${process.env.SUPABASE_URL}/storage/v1/object/public/${productData.images[0]}`} alt="product 1" />
        </Link>
        <div className="mt-2 mb-1">
          <div className='flex flex-wrap items-center gap-3 '>
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

          <h2 className="text-2xl truncate text-headingText">{productData.name}</h2>
          {productData.discount ?
            <div className="flex items-end justify-end gap-2 pt-3 direction-reverse">
              <p className="text-sm line-through">${productData.price}</p>
              <p className="text-xl font-semibold text-headingText">${productData.discountPrice}</p>
            </div>
            :
            <div className="pt-3">
              <p className="font-semibold text-end">${productData.price}</p>
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