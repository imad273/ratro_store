import React from 'react'
import { MdNearbyError } from 'react-icons/md'

const EmptyProducts = ({ from }: { from: string }) => {
  return (
    <div className="flex items-center justify-center min-h-[70vh] p-5">
      <div className="text-center">
        <div className="inline-flex p-4 bg-yellow-100 rounded-full">
          <div className="p-4 bg-yellow-200 rounded-full text-yellow-600">
            <MdNearbyError size={36} />
          </div>
        </div>
        <h1 className="mt-5 text-3xl font-bold text-headingText lg:text-4xl">
          {from = "cart" ?
            "There is no products in the cart"
            :
            "There is no products currently"
          }
        </h1>
        <p className="mt-5 text-sm text-slate-600">Any Products added will be shown here</p>
      </div>
    </div>
  )
}

export default EmptyProducts