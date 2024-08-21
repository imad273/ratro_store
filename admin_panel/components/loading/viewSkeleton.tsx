import React from 'react'

const viewSkeleton = () => {
  return (
    <div className='space-y-6'>

      <div role="status" className="max-full animate-pulse">
        <div className="h-2.5 rounded-full bg-gray-700 w-2/6 mb-4"></div>
        <div className="h-2 rounded-full bg-gray-700 w-full mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 w-full mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 w-5/6 mb-2.5"></div>
        <div className="w-4/6 h-2 bg-gray-700 rounded-full"></div>
      </div>

      <div role="status" className="max-full animate-pulse">
        <div className="h-2.5 rounded-full bg-gray-700 w-3/6 mb-4"></div>
        <div className="h-2 rounded-full bg-gray-700 w-full mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 w-full mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 w-full mb-2.5"></div>
        <div className="w-5/6 h-2 bg-gray-700 rounded-full"></div>
      </div>

      <div role="status" className="max-full animate-pulse">
        <div className="h-2.5 rounded-full bg-gray-700 w-2/6 mb-4"></div>
        <div className="h-2 rounded-full bg-gray-700 w-full mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 w-full mb-2.5"></div>
        <div className="h-2 rounded-full bg-gray-700 w-5/6 mb-2.5"></div>
        <div className="w-4/6 h-2 bg-gray-700 rounded-full"></div>
      </div>


    </div>
  )
}

export default viewSkeleton