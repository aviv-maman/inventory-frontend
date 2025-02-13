'use client';

import { Button, Navbar } from '@heroui/react';
import Link from 'next/link';
import { managementLinks } from './HeaderLinks';
import { GitHub, Logo } from '@/assets/icons';
import AccountDropdown from '@/components/AccountDropdown';
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
          <AccountDropdown user={user} clientLogout={clientLogout} isLoading={isLoading} />
          <Link href='https://github.com/aviv-maman/inventory-frontend' target='_blank' referrerPolicy='no-referrer'>
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
