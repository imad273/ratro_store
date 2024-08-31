import React from 'react'
import LOGO from "@/assets/RATRO-logo.png"
import Image from "next/image"
import { FaFacebook } from 'react-icons/fa6'
import { FaTiktok } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'
import { PiInstagramLogoDuotone } from 'react-icons/pi'

const Footer = () => {
  return (
    <footer className="bg-gray-100 ">
      <div className="container">
        <div className="py-10">
          <div className="lg:flex">
            <div className="w-full lg:w-2/5">
              <div>
                <a href="/" className='flex items-center justify-center pb-5 md:pb-0 md:block'>
                  <Image className="w-auto h-7" src={LOGO} alt="Logo" />
                </a>

                <p className="max-w-sm mt-2 text-sm text-gray-500">Join our community on social media and share your experience with us!</p>

                <div className="flex items-center gap-3 my-3">
                  <div className='text-gray-600 duration-200 cursor-pointer hover:text-gray-700'>
                    <FaFacebook size={21} />
                  </div>
                  <div className='text-gray-600 duration-200 cursor-pointer hover:text-gray-700'>
                    <PiInstagramLogoDuotone size={21} />
                  </div>
                  <div className='text-gray-600 duration-200 cursor-pointer hover:text-gray-700'>
                    <FaTiktok size={20} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 lg:mt-0 md:flex-1">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-gray-700 uppercase">Resources</h3>
                  <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Privacy Policy</a>
                  <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Terms & conditions</a>
                  <a href="#" className="block mt-2 text-sm text-gray-600 hover:underline">Refund & Return Policy</a>
                </div>

                <div>
                  <h3 className="text-gray-700 uppercase">Contact</h3>
                  <span className="block mt-2 text-sm text-gray-600">+1 526 654 8965</span>
                  <span className="block mt-2 text-sm text-gray-600 hover:underline">example@email.com</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="h-px my-6 bg-gray-300 border-none" />

          <div>
            <p className="text-center text-gray-500">© Ratro 2024 - All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer