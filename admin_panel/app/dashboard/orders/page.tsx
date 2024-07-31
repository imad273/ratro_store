import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import OrdersTable from '@/components/tables/orders/OrdersTable';
import { users } from '@/constants/data';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Orders', link: '/dashboard/orders' }
];

export default function page() {
  return (
    <PageContainer>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <OrdersTable data={users} />
      </div>
    </PageContainer>
  );
}
