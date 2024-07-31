import Header from '@/components/layout/header';
import Sidebar from '@/components/sidebar/sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 w-full overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}
