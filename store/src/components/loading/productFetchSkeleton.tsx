import React from 'react'

const ProductFetchSkeleton = () => {
  return (
    <section className="bg-white min-h-[80vh] flex justify-center items-center">
      <div className="container px-6 py-10 mx-auto animate-pulse">
        <h1 className="w-48 h-2 mx-auto bg-gray-200 rounded-lg"></h1>

        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg"></p>
        <p className="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80"></p>

        <div className="grid grid-cols-1 gap-8 mt-12 sm:grid-cols-3 lg:grid-cols-4">
          <div className="w-full">
            <div className="w-full h-56 bg-gray-300 rounded-lg"></div>

            <h1 className="w-full h-2 mt-4 bg-gray-200 rounded-lg"></h1>
            <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg"></p>
          </div>

          <div className="w-full ">
            <div className="w-full h-56 bg-gray-300 rounded-lg"></div>

            <h1 className="w-full h-2 mt-4 bg-gray-200 rounded-lg"></h1>
            <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg"></p>
          </div>

          <div className="w-full ">
            <div className="w-full h-56 bg-gray-300 rounded-lg"></div>

            <h1 className="w-full h-2 mt-4 bg-gray-200 rounded-lg"></h1>
            <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg"></p>
          </div>

          <div className="w-full ">
            <div className="w-full h-56 bg-gray-300 rounded-lg"></div>

            <h1 className="w-full h-2 mt-4 bg-gray-200 rounded-lg"></h1>
            <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg"></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductFetchSkeleton