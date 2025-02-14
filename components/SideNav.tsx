import { SideNavLinks, SideNavLogOut } from '@/components/SideNavLinks';

export default function SideNav() {
  return (
    <aside className='sticky top-[57px] flex flex-row justify-between border-b bg-background p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 sm:w-36 sm:flex-col sm:border-b-0 sm:border-r'>
      <nav className='flex flex-row items-center gap-4 sm:flex-col'>
        <SideNavLinks />
      </nav>
      <nav className='mt-auto flex flex-col items-center gap-4'>
        <SideNavLogOut />
      </nav>
    </aside>
  );
}
