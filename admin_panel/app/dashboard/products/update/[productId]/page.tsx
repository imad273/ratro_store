"use client"
import React from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { UpdateProductForm } from '@/components/forms/products/update-product-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Products', link: '/dashboard/products' },
  { title: 'Update', link: '/dashboard/products' }
];

const page = () => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <UpdateProductForm />
    </div>
  )
}

export default page