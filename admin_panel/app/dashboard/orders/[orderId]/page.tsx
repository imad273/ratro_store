import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProductForm } from '@/components/forms/product-form';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];
export default function Page() {
  return (
    <div className="space-y-4">
      <Breadcrumbs items={breadcrumbItems} />
      <ProductForm />
    </div>
  );
}
