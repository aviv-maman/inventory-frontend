'use client';

import { NextUIProvider } from '@nextui-org/react';
import { GlobalProvider } from '@/context/GlobalProvider';
import { useIsClient } from '@/hooks/useIsClient';
import type { verifySession } from '@/lib/auth/requests';

export function Providers({
  children,
  user,
}: Readonly<{ children: React.ReactNode; user: Awaited<ReturnType<typeof verifySession>>['user'] }>) {
  const isClient = useIsClient();

  return isClient ? (
    <GlobalProvider user={user}>
      <NextUIProvider>{children}</NextUIProvider>
    </GlobalProvider>
  ) : null;
}
