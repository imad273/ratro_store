"use client"
import React from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { CreateProductForm } from '@/components/forms/products/create-product-form';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Products', link: '/dashboard/products' },
  { title: 'Create', link: '/dashboard/products/create' }
];

const page = () => {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <CreateProductForm />
    </div>
  )
}

export default page