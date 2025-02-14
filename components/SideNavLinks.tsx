'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LoaderCircle, LogOut, Settings, User } from '@/assets/icons';
import ReceiptText from '@/assets/icons/ReceiptText';
import { useGlobalContext } from '@/context/GlobalProvider';
import { cn } from '@/lib/utils';

const LINKS = [
  {
    name: 'Account',
    href: '/account',
    icon: <User className='size-5' />,
  },
  {
    name: 'Orders',
    href: '/account/orders',
    icon: <ReceiptText className='size-5' />,
  },
  {
    name: 'Settings',
    href: '/account/settings',
    icon: <Settings className='size-5' />,
  },
];

export const SideNavLinks: React.FC = () => {
  const pathname = usePathname();
  return (
    <>
      {LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          passHref
          className={cn('w-full rounded-md', {
            'bg-primary-100': pathname === link.href,
          })}>
          <Button
            className='w-full rounded-md dark:hover:bg-[#27272a]'
            variant='light'
            radius='none'
            startContent={link.icon}>
            {link.name}
          </Button>
          <span className='sr-only'>{link.name}</span>
        </Link>
      ))}
    </>
  );
};

export const SideNavLogOut: React.FC = () => {
  const { isLoading, clientLogout } = useGlobalContext();
  return (
    <Button
      variant='light'
      radius='none'
      className='rounded-md'
      disabled={isLoading}
      aria-disabled={isLoading}
      onPress={clientLogout}>
      {isLoading ? <LoaderCircle className='size-5 animate-spin' /> : <LogOut className='size-5' />}
      <span className=''>Logout</span>
    </Button>
  );
};
