import React from 'react'

const TextSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
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
        className="block h-2 mb-2 font-sans text-base antialiased font-light leading-relaxed bg-gray-300 rounded-full text-inherit w-5/6">
        &nbsp;
      </div>
    </div>
  )
}

export default TextSkeleton