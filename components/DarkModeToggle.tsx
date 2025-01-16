'use client';

import { Button } from '@heroui/react';
import { Moon, Sun } from '@/assets/icons';
import { useGlobalContext } from '@/context/GlobalProvider';

type DarkModeToggleProps = {
  color?: string;
  size?: number;
  className?: string;
};

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ color, size = 20, className }) => {
  const { isDarkMode, toggleDarkMode } = useGlobalContext();

  return (
    <Button
      type='button'
      isIconOnly
      size='sm'
      onPress={toggleDarkMode}
      className={`size-8 ${className}`}
      aria-label='Toggle dark mode'
      variant='ghost'>
      {isDarkMode ? (
        <Sun color={color} width={size} height={size} />
      ) : (
        <Moon color={color} width={size} height={size} />
      )}
    </Button>
  );
};
