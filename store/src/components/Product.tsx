import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { BiSolidMedal, BiSolidPurchaseTag } from 'react-icons/bi'
import { FaTag } from 'react-icons/fa'

interface Props {
  img: any
  name: string
  discount: boolean
  price: number
  discountPrice: number
}

const Product = ({ img, name, price, discount, discountPrice }: Props) => {
  return (
    <div className="border p-1 rounded flex flex-col justify-between h-full">
      <div className='flex flex-col justify-between h-full'>
        <Image className="w-full h-60 md:h-52 rounded" src={img} alt="product 1" />
        <div className="mt-2 mb-1">
          {name === "CyberEar" &&
            <div className='flex mb-2'>
              <p className='pl-2 pr-2.5 py-1 flex items-center text-xs font-semibold gap-2 text-white bg-yellow-500 shadow-md shadow-yellow-300/40 rounded-2xl'>
                <BiSolidMedal size={18} />
                Best Seller
              </p>
            </div>
          }
          {name === "Unspel" &&
            <div className='flex mb-2'>
              <p className='pl-2 pr-2.5 py-1 flex items-center text-xs font-semibold gap-2 text-white bg-green-500 shadow-md shadow-yellow-300/40 rounded-2xl'>
                <BiSolidPurchaseTag size={18} />
                New
              </p>
            </div>
          }
          <h2 className="text-headingText text-2xl">{name}</h2>
          {discount ?
            <div className="pt-3 flex direction-reverse items-end justify-end gap-2">
              <p className="line-through text-sm">${price}</p>
              <p className="text-xl text-headingText font-semibold">${discountPrice}</p>
            </div>
            :
            <div className="pt-3">
              <p className="text-end">${price}</p>
            </div>
          }
        </div>
      </div>
      <div>
        <Link href={"/products/123"}>
          <Button className="w-full mt-2 rounded">Buy</Button>
        </Link>
      </div>
    </div>
  )
}

export default Product