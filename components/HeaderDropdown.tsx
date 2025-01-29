'use client';

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, NavbarItem } from '@heroui/react';
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from 'next/navigation';
import { ChevronDown } from '@/assets/icons';

interface HeaderDropdownProps {
  targetSegment: string;
  links: {
    href: string;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[];
}

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ targetSegment, links }) => {
  const activeSegment = useSelectedLayoutSegment();
  const activeSegments = useSelectedLayoutSegments();

  const dropdownLabel = targetSegment;
  const capitalizedLabel = dropdownLabel.charAt(0).toUpperCase() + dropdownLabel.slice(1);
  const dropdownId = `dropdown-${dropdownLabel}`;

  return (
    <Dropdown id={dropdownId}>
      <NavbarItem isActive={activeSegment === targetSegment}>
        <DropdownTrigger>
          <Link
            color={activeSegment === targetSegment ? 'primary' : 'foreground'}
            className='cursor-pointer bg-transparent p-0 data-[hover=true]:bg-transparent'>
            {capitalizedLabel} {<ChevronDown className='size-5' />}
          </Link>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label={`${capitalizedLabel} Menu`}
        className='w-[340px]'
        itemClasses={{
          base: 'gap-4',
        }}>
        {links.map((link) => {
          const { href, label, description, icon } = link;
          return (
            <DropdownItem
              key={href}
              href={href}
              description={description}
              startContent={icon}
              classNames={{ description: 'text-wrap' }}
              className={href === `/${activeSegment}/${activeSegments[1]}` ? 'bg-primary-500/10' : ''}>
              {label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderDropdown;
