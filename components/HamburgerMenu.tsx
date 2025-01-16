'use client';

import { Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, useDisclosure } from '@heroui/react';
import type { Route } from 'next';
import Link from 'next/link';
import { Menu } from '@/assets/icons';

export const HamburgerMenu: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const components: { title: string; href?: string; action?: () => void; description: string }[] = [
    {
      title: 'Home',
      href: '/',
      description: 'Home page.',
    },
    {
      title: 'Sign In',
      href: '/login',
      description: 'Login to an existing account or register a new account.',
    },
  ];

  return (
    <>
      <Button className='md:hidden' variant='light' onPress={onOpen} size='sm' isIconOnly>
        <Menu className='size-4' />
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange} backdrop='transparent' placement='left'>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className='flex flex-col gap-1'>Menu</DrawerHeader>
              <DrawerBody>
                {components?.map((component) => (
                  <Link
                    key={component.title}
                    href={component.href as Route}
                    className='mt-2 w-fit text-left text-sm'
                    onClick={onClose}>
                    {component.title}
                  </Link>
                ))}
              </DrawerBody>
              <DrawerFooter>
                <Button color='danger' onPress={onClose}>
                  Close
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
