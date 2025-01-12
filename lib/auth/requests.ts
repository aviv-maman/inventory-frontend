import { redirect } from 'next/navigation';
import { cache } from 'react';

//import { schema } from '@/schema';

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

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
  const response = await fetch(`${process.env.SERVER_URL}/api/auth/verify-session`, {
    // method: 'GET',
    // credentials: 'include',
  });
  const { user } = await response.json();

  // if (!user?.id) {
  //   redirect('/login');
  // }

  return user;
});
