'use client';

import { Button, Navbar } from '@heroui/react';
import Link from 'next/link';
import { managementLinks } from './HeaderLinks';
import { GitHub, Logo } from '@/assets/icons';
import { CartDrawer } from '@/components/CartDrawer';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import HeaderDropdown from '@/components/HeaderDropdown';
import SearchInput from '@/components/SearchInput';
import { useGlobalContext } from '@/context/GlobalProvider';
import { useIsClient } from '@/hooks/useIsClient';

const Header: React.FC = () => {
  const isClient = useIsClient();
  const { user, clientLogout, isLoading } = useGlobalContext();

  const userComponents: { title: string; href?: string; action?: () => void; description: string }[] = [
    {
      title: 'Profile',
      href: '/profile',
      description: 'Your user profile.',
    },
    {
      title: 'Logout',
      action: clientLogout,
      description: 'Logout the current session.',
    },
  ];

  return isClient ? (
    <Navbar isBordered height={56} maxWidth='full' classNames={{ wrapper: 'px-4 md:px-8' }}>
      <div className='mr-4 hidden md:flex'>
        <div className='mr-6 flex items-center space-x-2'>
          <Link href='/' className='mr-6 flex items-center space-x-2' passHref>
            <Logo className='size-6' />
            <span>InvSys</span>
          </Link>
        </div>
        <HeaderDropdown targetSegment='management' links={managementLinks} />
      </div>

      {/* MOBILE MENU */}
      <div className='inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md px-0 py-2 text-base font-medium transition-colors hover:bg-transparent focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 md:hidden'>
        <HamburgerMenu />
        <span className='sr-only'>Toggle Menu</span>
      </div>

      <div className='flex items-center'>
        <SearchInput />
        <div className='flex flex-row gap-x-2'>
          {!user ? (
            <Link aria-label='login' href='/login' passHref>
              <Button
                aria-label='Log In'
                variant='ghost'
                size='sm'
                className='size-8 bg-transparent'
                aria-disabled={isLoading}
                isLoading={isLoading}>
                Log In
              </Button>
            </Link>
          ) : (
            <Button
              onPress={clientLogout}
              aria-label='Log Out'
              variant='ghost'
              size='sm'
              className='size-8 bg-transparent'
              aria-disabled={isLoading}
              isDisabled={isLoading}>
              Log Out
            </Button>
          )}
          <Link href='https://github.com/aviv-maman' target='_blank' referrerPolicy='no-referrer'>
            <Button aria-label='GitHub' variant='ghost' isIconOnly size='sm' className='size-8 bg-transparent'>
              <GitHub className='size-4' />
            </Button>
          </Link>
          <DarkModeToggle />
          <CartDrawer />
        </div>
      </div>
    </Navbar>
  ) : null;
};

export default Header;
