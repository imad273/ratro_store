"use client"
import React from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { ProductForm } from '@/components/forms/product-form';
import supabase from '@/lib/supabaseClient';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];

const page = () => {
  //console.log(supabase);
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <ProductForm />
    </div>
  )
}

export default page