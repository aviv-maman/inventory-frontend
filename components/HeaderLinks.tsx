import { Affiliate } from '@/assets/icons';

export const managementLinks = [
  {
    href: '/management/user-management',
    label: 'User Management',
    description: 'View and edit users.',
    icon: <Affiliate className='size-6 text-warning' />,
  },
  {
    href: '/management/employee-addition',
    label: 'Add Employee',
    description: 'Add a new employee.',
    icon: <Affiliate className='size-6 text-primary' />,
  },
  {
    href: '/management/store-addition',
    label: 'Add Store',
    description: 'Add a new store.',
    icon: <Affiliate className='size-6 text-success' />,
  },
];
