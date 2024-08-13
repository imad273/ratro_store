"use client"

import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from '@/components/ui/toaster';
import { Footer, Navbar, PromotionSign } from "@/components";
import { useEffect, useState } from "react";
import useCart from "@/zustand/cart";
import SiteLoading from "@/components/loading/siteLoading";
import supabase from "@/lib/supabaseClient";
import { SettingsProps } from "@/types/settings.type";
import useSettings from "@/zustand/settings";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { addItem, setIsLoading } = useCart();

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
      let parse = JSON.parse(storedCart);

      parse.map((product: any) => (
        addItem(product.product, product.quantity)
      ))
    }

    setIsLoading(false)
  }, []);

  const { setSettings } = useSettings();
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [settings, setSettingsData] = useState<SettingsProps>();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select()

      if (!error) {
        setSettings(data[0])
        setSettingsData(data[0])
        setLoadingSettings(false)
      }
    }

    fetchSettings();
  }, [])

  return (
    <html lang="en">
      <body>
        {loadingSettings ?
          <SiteLoading />
          :
          <>
            {settings?.promotionSign &&
              <PromotionSign promotionSignText={settings.promotionSignText} />
            }
            <Navbar />
            <main>
              <Toaster />
              {children}
            </main>
            <Footer />
          </>
        }
      </body>
    </html>
  );
}
