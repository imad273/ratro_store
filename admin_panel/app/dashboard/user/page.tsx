"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import { UsersTable } from '@/components/tables/users/usersTable';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserProps } from '@/types/users.types';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' }
];

export default function page() {
  const router = useRouter();

  const users: UserProps[] = [
    {
      id: 1,
      name: 'Candice Schiner',
      company: 'Dell',
      role: 'Frontend Developer',
      verified: false,
      status: 'Active'
    },
    {
      id: 2,
      name: 'John Doe',
      company: 'TechCorp',
      role: 'Backend Developer',
      verified: true,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Alice Johnson',
      company: 'WebTech',
      role: 'UI Designer',
      verified: true,
      status: 'Active'
    },
    {
      id: 4,
      name: 'David Smith',
      company: 'Innovate Inc.',
      role: 'Fullstack Developer',
      verified: false,
      status: 'Inactive'
    },
    {
      id: 5,
      name: 'Emma Wilson',
      company: 'TechGuru',
      role: 'Product Manager',
      verified: true,
      status: 'Active'
    },
    {
      id: 6,
      name: 'James Brown',
      company: 'CodeGenius',
      role: 'QA Engineer',
      verified: false,
      status: 'Active'
    },
    {
      id: 7,
      name: 'Laura White',
      company: 'SoftWorks',
      role: 'UX Designer',
      verified: true,
      status: 'Active'
    },
    {
      id: 8,
      name: 'Michael Lee',
      company: 'DevCraft',
      role: 'DevOps Engineer',
      verified: false,
      status: 'Active'
    },
    {
      id: 9,
      name: 'Olivia Green',
      company: 'WebSolutions',
      role: 'Frontend Developer',
      verified: true,
      status: 'Active'
    },
    {
      id: 10,
      name: 'Robert Taylor',
      company: 'DataTech',
      role: 'Data Analyst',
      verified: false,
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-2">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
        </div>
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>
      <Separator />

      <UsersTable data={users} />
    </div>
  );
}
