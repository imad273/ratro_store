import React from 'react'

const ProductPreviewSkeleton = () => {
  return (
    <div className="w-full flex flex-wrap items-center gap-8 animate-pulse">
      <div className="grid bg-gray-300 rounded-lg h-56 w-64 place-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
          className="w-12 h-12 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z">
          </path>
        </svg>
      </div>
      <div className="md:flex-1 w-full">
        <div
          className="block w-3/6 h-3 mb-4 font-sans text-5xl antialiased font-semibold leading-tight tracking-normal bg-gray-300 rounded-full text-inherit">
          &nbsp;
        </div>
        <div
          className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
          &nbsp;
        </div>
        <div
          className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
          &nbsp;
        </div>
        <div
          className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
          &nbsp;
        </div>
        <div
          className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-full">
          &nbsp;
        </div>
        <div
          className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-5/6">
          &nbsp;
        </div>
        <div
          className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-4/6">
          &nbsp;
        </div>
      </div>
    </div>
  )
}

export default ProductPreviewSkeleton