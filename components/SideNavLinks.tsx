'use client';

import { Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LoaderCircle, LogOut, Settings, User } from '@/assets/icons';
import ReceiptText from '@/assets/icons/ReceiptText';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useMediaQuery } from '@/hooks/useMediaQuery';
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
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <>
      {LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          passHref
          className={cn('rounded-md md:w-full', {
            'bg-primary-100': pathname === link.href,
          })}>
          <Button
            className='rounded-md dark:hover:bg-[#27272a] md:w-full'
            variant='light'
            radius='none'
            isIconOnly={!isDesktop}
            startContent={link.icon}>
            {isDesktop && link.name}
          </Button>
          <span className='sr-only'>{link.name}</span>
        </Link>
      ))}
    </>
  );
};

export const SideNavLogOut: React.FC = () => {
  const { isLoading, clientLogout } = useGlobalContext();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <Button
      variant='light'
      radius='none'
      className='rounded-md'
      isIconOnly={!isDesktop}
      disabled={isLoading}
      aria-disabled={isLoading}
      onPress={clientLogout}>
      {isLoading ? <LoaderCircle className='size-5 animate-spin' /> : <LogOut className='size-5' />}
      {isDesktop && <span className=''>Logout</span>}
    </Button>
  );
};
