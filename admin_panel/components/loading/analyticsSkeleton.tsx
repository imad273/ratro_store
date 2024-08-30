import { Activity } from 'lucide-react'
import React from 'react'

const analyticsSkeleton = () => {
  return (
    <div className='grid grid-cols-2 gap-5 my-5'>
      <div className="flex items-center justify-center h-[300px] w-full rounded-lg animate-pulse bg-gray-700">
        <Activity className='text-gray-500' size={34}/>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="flex items-center justify-center h-[300px] w-full rounded-lg animate-pulse bg-gray-700">
        <Activity className='text-gray-500' size={34}/>
        <span className="sr-only">Loading...</span>
      </div>
      <div className="flex items-center justify-center h-[300px] w-full rounded-lg animate-pulse bg-gray-700">
        <Activity className='text-gray-500' size={34}/>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default analyticsSkeleton