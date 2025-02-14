import { Affiliate } from '@/assets/icons';

export const managementLinks = [
  {
    href: '/management/employee-addition',
    label: 'Add Employee',
    description: 'Add a new employee',
    icon: <Affiliate className='size-6 text-primary' />,
  },
  {
    href: '/management/user-management',
    label: 'Manage Users',
    description: 'View and edit users',
    icon: <Affiliate className='size-6 text-warning' />,
  },
  {
    href: '/management/store-addition',
    label: 'Add Store',
    description: 'Add a new store',
    icon: <Affiliate className='size-6 text-success' />,
  },
  {
    href: '/management/store-management',
    label: 'Manage Stores',
    description: 'View and edit stores and their stocks',
    icon: <Affiliate className='size-6 text-secondary' />,
  },
  {
    href: '/management/product-addition',
    label: 'Add Product',
    description: 'Add a new product',
    icon: <Affiliate className='size-6 text-danger' />,
  },
  {
    href: '/management/category-addition',
    label: 'Add Category',
    description: 'Add a new category',
    icon: <Affiliate className='size-6 text-orange-600' />,
  },
];
