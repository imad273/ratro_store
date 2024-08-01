import { Breadcrumbs } from '@/components/breadcrumbs';
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
      {/* <ProductForm
          categories={[
            { _id: 'shirts', name: 'shirts' },
            { _id: 'pants', name: 'pants' }
          ]}
          initialData={null}
          key={null}
        /> */}
    </div>
  );
}
