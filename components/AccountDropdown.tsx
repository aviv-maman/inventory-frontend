'use client';

import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import type { DropdownItemProps } from '@heroui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { LogIn } from '@/assets/icons';
import type { User } from '@/types/general';

const AVATAR_DROP_ITEMS = [
  { key: 'account', textValue: 'Signed in as', href: '/account', color: 'success' },
  { key: 'my-orders', textValue: 'My Orders', href: '/account/orders', color: 'primary' },
  { key: 'about', textValue: 'About', href: '/about', color: 'primary' },
  { key: 'logout', textValue: 'Logout', color: 'danger' },
] satisfies DropdownItemProps[];

interface AccountDropdownProps {
  user?: User | null;
  clientLogout: () => Promise<void>;
  isLoading?: boolean;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ user, clientLogout, isLoading }) => {
  return (
    <Fragment>
      {!user?._id ? (
        <Link aria-label='login' href='/login' passHref>
          <Button
            aria-label='Log In'
            variant='ghost'
            size='sm'
            className='size-8 bg-transparent'
            isIconOnly
            aria-disabled={isLoading}
            isDisabled={isLoading}>
            <LogIn className='size-4' />
          </Button>
        </Link>
      ) : (
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              as='button'
              className='border-2 border-gray-400 dark:border-gray-600'
              classNames={{
                img: 'w-8 h-8',
                base: 'bg-gradient-to-br from-[#9353D3] to-[#006FEE] dark:from-[#6020A0] dark:to-[#004493] w-8 h-8',
              }}
              color='default'
              name={undefined}
              src={undefined}
              radius='sm'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Account Actions' variant='faded'>
            {AVATAR_DROP_ITEMS.map((item) => (
              <DropdownItem
                onPress={item.key === 'logout' ? clientLogout : undefined}
                description={item.key === 'account' && user.email}
                {...item}
                key={item.key}>
                {item.textValue}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      )}
    </Fragment>
  );
};

export default AccountDropdown;
