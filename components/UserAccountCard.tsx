'use client';

import { Card, CardBody, CardFooter, CardHeader, Skeleton, Spacer } from '@heroui/react';
import Link from 'next/link';
import { CalendarClock, CalendarDays, ID, Mail } from '@/assets/icons';
import { useGlobalContext } from '@/context/GlobalProvider';

const UserAccountCard: React.FC = () => {
  const { isLoading, user } = useGlobalContext();

  return isLoading ? (
    <Skeleton className='rounded-lg'>
      <div className='h-96 rounded-lg bg-default-300' />
    </Skeleton>
  ) : (
    <Card className='overflow-hidden'>
      <CardHeader className='flex flex-row items-start p-4 sm:p-6'>
        <div className='grid gap-0.5'>
          <p className='group flex items-center gap-2 text-xl md:text-2xl'>
            {`${user?.firstName}` + ` ` + `${user?.lastName}`}
          </p>
          <span>{user?.role || 'user'}</span>
        </div>
      </CardHeader>
      <CardBody className='p-6 text-sm'>
        <div className='grid gap-3'>
          <div className='font-semibold'>Personal Details</div>
          <dl className='grid gap-3'>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1'>
                <ID className='size-4' /> Full Name
              </dt>
              <dd>{`${user?.firstName}` + ` ` + `${user?.lastName}`}</dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1'>
                <Mail className='size-4' />
                Email
              </dt>
              <dd>
                <Link href={`mailto:${user?.email}`}>{user?.email}</Link>
              </dd>
            </div>
          </dl>
        </div>
        <Spacer className='my-4' />
        <div className='grid gap-3'>
          <div className='font-semibold'>Account Information</div>
          <dl className='grid gap-3'>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1'>
                <CalendarClock className='size-4' /> Updated at
              </dt>
              <dd>{String(user?.updatedAt)}</dd>
            </div>
            <div className='flex items-center justify-between'>
              <dt className='flex items-center gap-1'>
                <CalendarDays className='size-4' /> Member Since
              </dt>
              <dd>{String(user?.createdAt)}</dd>
            </div>
          </dl>
        </div>
      </CardBody>
      <CardFooter className='flex flex-row items-center border-t px-4 py-3 sm:px-6'>
        <div className='text-xs'>
          Last Update at <time dateTime='2024-01-01'>{String(user?.updatedAt)}</time>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserAccountCard;
