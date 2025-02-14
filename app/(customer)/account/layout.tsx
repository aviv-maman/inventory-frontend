import { redirect } from 'next/navigation';
import SideNav from '@/components/SideNav';
import { verifySession } from '@/lib/auth/requests';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await verifySession();
  if (!user) redirect('/');

  return (
    <div id='account-layout' className='w-full flex-row sm:flex'>
      <SideNav />
      <div className='flex min-h-[calc(100vh-195px)] w-full flex-col sm:min-h-[calc(100vh-138px)] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
        {children}
      </div>
    </div>
  );
}
