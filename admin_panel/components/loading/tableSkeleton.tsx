import React from 'react'

const TableSkeleton = () => {
  return (

    <div className="w-full p-4 space-y-4 border border-gray-700 divide-y divide-gray-700 rounded-md shadow animate-pulse md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
      </div>
      <div className="flex items-center justify-between pt-4">
        <div>
          <div className="h-2.5 rounded-full bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-32 h-2 bg-gray-700 rounded-full"></div>
        </div>
        <div className="h-2.5 rounded-full bg-gray-700 w-12"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>

  )
}

export default TableSkeleton