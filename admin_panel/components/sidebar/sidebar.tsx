'use client';
import React from 'react';
import { DashboardNav } from '@/components/sidebar/dashboard-nav';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';
import Link from 'next/link';
import { NavItem } from '@/types';
import LOGO from '@/assets/logo.png';
import Image from 'next/image';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: 'dashboard',
    },
    {
      title: 'Products',
      href: '/dashboard/products',
      icon: 'Package',
    },
    {
      title: 'Orders',
      href: '/dashboard/orders',
      icon: 'ShoppingCart',
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: 'ChartBar',
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: 'settings',
    }
  ];

  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        !isMinimized ? 'w-72' : 'w-[72px]',
        className
      )}
    >
      <div className="hidden p-5 pt-10 pb-10 lg:block">
        <Image src={LOGO} alt='logo' className='w-40 h-9' />
      </div>
      <ChevronLeft
        className={cn(
          'absolute -right-3 top-10 z-50  cursor-pointer rounded-full border bg-background text-3xl text-foreground',
          isMinimized && 'rotate-180'
        )}
        onClick={handleToggle}
      />
      <div className="py-4 space-y-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
    </aside>
  );
}
