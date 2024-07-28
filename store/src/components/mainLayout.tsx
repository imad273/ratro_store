import React from 'react'
import { Navbar, PromotionSign } from "@/components";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <PromotionSign />
      <Navbar />
      <main>
        {children}
      </main>
    </>
  )
}

export default MainLayout