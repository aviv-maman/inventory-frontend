'use client';

import { NextUIProvider } from '@nextui-org/react';
import { GlobalProvider } from '@/context/GlobalProvider';
import { useIsClient } from '@/hooks/useIsClient';

export function Providers({ children }: { children: React.ReactNode }) {
  const isClient = useIsClient();

  return isClient ? (
    <GlobalProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </GlobalProvider>
  ) : null;
}
