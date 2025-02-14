'use client';

import { Select, SelectItem } from '@heroui/react';
import { Moon, Sun, SunMoon } from '@/assets/icons';
import { useGlobalContext } from '@/context/GlobalProvider';

const SelectTheme: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useGlobalContext();

  return (
    <Select
      id='theme-select'
      disallowEmptySelection
      defaultSelectedKeys={isDarkMode ? ['dark'] : ['light']}
      selectedKeys={isDarkMode ? ['dark'] : ['light']}
      label={<label htmlFor='theme-select'>Theme</label>}
      labelPlacement='outside'
      variant='faded'
      startContent={<SunMoon className='size-5' />}
      onSelectionChange={toggleDarkMode}>
      <SelectItem key={'light'} startContent={<Sun className='size-4' />}>
        Light
      </SelectItem>
      <SelectItem key={'dark'} startContent={<Moon className='size-4' />}>
        Dark
      </SelectItem>
    </Select>
  );
};

export default SelectTheme;
