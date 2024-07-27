import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

interface Props {
  img: any
  name: string
  discount: boolean
  price: number
  discountPrice: number
}

const Product = ({ img, name, price, discount, discountPrice }: Props) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Image className="w-full h-60 md:h-52 rounded" src={img} alt="product 1" />
        <div className="mt-4 mb-1">
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
        <Button className="w-full mt-2">Buy</Button>
      </div>
    </div>
  )
}

export default Product