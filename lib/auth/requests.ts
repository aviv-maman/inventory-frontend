import { cookies } from 'next/headers';
import { cache } from 'react';
import type { User } from '@/types/general';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session.user) return null;

  try {
    // const data = await db.query.users.findMany({
    //   where: eq(users.id, session.userId),

    //   // Explicitly return the columns you need rather than the whole user object
    //   columns: {
    //     id: true,
    //     name: true,
    //     email: true,
    //   },
    // });

    const user = { id: 1, name: 'John Doe', email: 'a@a.com' };
    return user;
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/verify-session`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
    });
    const data = await response.json();
    if (data.user) {
      return { user: data.user as User, error: null };
    } else {
      return { user: null, error: { message: data.message as string, statusCode: (data.statusCode as number) || 500 } };
    }
  } catch (error) {
    return {
      user: null,
      error: { message: error instanceof Error ? error.message : 'Something went wrong', statusCode: 500 },
    };
  }
});
