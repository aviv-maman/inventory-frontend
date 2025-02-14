import type { Metadata } from 'next';
import SettingsCard from '@/components/SettingsCard';

export const metadata: Metadata = {
  title: 'Settings',
};

export default async function SettingsPage() {
  return (
    <div className='flex w-full flex-col self-center sm:container sm:max-w-3xl'>
      <main className='flex flex-1 flex-col gap-4 p-4'>
        <div className='flex items-center'>
          <h1 className='text-2xl font-semibold'>Settings</h1>
        </div>
        <SettingsCard />
      </main>
    </div>
  );
}
