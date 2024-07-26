"use client"

import Link from "next/link"
import Image from "next/image"
import LOGO from "@/assets/RATRO-logo.png"
import { IoBagHandleOutline } from "react-icons/io5"
import { RiMenu3Line } from "react-icons/ri"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"

export default function NavBar() {
  const [phoneMenu, setPhoneMenu] = useState(false);

  return (
    <nav className="shadow">
      <div className="container">
        <div className="flex items-center py-4">
          <Link href="#" className="mr-auto flex items-center gap-2 text-lg font-semibold">
            <Image src={LOGO} alt="RATRO Logo" className="w-36 h-8" />
          </Link>

          <div className="flex items-center space-x-5 md:space-x-8">
            <nav className={`${phoneMenu ? "w-full" : "w-0"} fixed md:static top-0 left-0 h-full flex-col md:flex-row justify-center bg-white duration-300 overflow-hidden md:w-full flex items-center gap-8`}>
              <div className="md:hidden absolute top-5 right-6" onClick={() => setPhoneMenu(false)}>
                <IoMdClose size={22} />
              </div>

              <Link href="#" className="text-gray-500 hover:text-main duration-300 font-semibold">
                Home
              </Link>
              <Link href="#" className="text-gray-500 hover:text-main duration-300 font-semibold">
                Products
              </Link>
              <Link href="#" className="text-gray-500 hover:text-main duration-300 font-semibold">
                About
              </Link>
              <Link href="#" className="text-gray-500 hover:text-main duration-300 font-semibold">
                FAQ
              </Link>

            </nav>

            <Link href="#" className="bg-main hover:bg-mainHover duration-300 shadow-md shadow-main/50 border-none rounded-xl text-white p-2.5">
              <IoBagHandleOutline size={21} />
            </Link>

            <div className="md:hidden" onClick={() => setPhoneMenu(true)}>
              <RiMenu3Line size={23} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}