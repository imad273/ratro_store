"use client"

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from '@/components/ui/toaster';
import { Footer, Navbar, PromotionSign } from "@/components";
import { useEffect } from "react";
import useCart from "@/zustand/cart";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { addItem } = useCart();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      let parse = JSON.parse(storedCart);

      parse.map((product: any) => (
        addItem(product.product, product.quantity)
      ))
    }
  }, []);

  return (
    <html lang="en">
      <body>
        <PromotionSign />
        <Navbar />
        <main>
          <Toaster />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
