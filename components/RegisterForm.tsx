'use client';

import { Button, Input } from '@nextui-org/react';
import { useActionState } from 'react';
import { register } from '@/lib/auth';
import type { FormState } from '@/lib/auth/definitions';

export function RegisterForm() {
  const initialState: FormState = { message: '' };
  const [formState, formAction, isPending] = useActionState(register, initialState);

  return (
    <form action={formAction}>
      <div className='flex flex-col gap-2'>
        <div>
          <label htmlFor='name'>Name</label>
          <Input id='name' name='name' placeholder='John Doe' />
        </div>
        {formState?.errors?.name && <p className='text-sm text-red-500'>{formState.errors.name}</p>}
        <div>
          <label htmlFor='email'>Email</label>
          <Input id='email' name='email' placeholder='mail@example.com' />
        </div>
        {formState?.errors?.email && <p className='text-sm text-red-500'>{formState.errors.email}</p>}
        <div>
          <label htmlFor='password'>Password</label>
          <Input id='password' name='password' type='password' placeholder='***' />
        </div>
        {formState?.errors?.password && (
          <div className='text-sm text-red-500'>
            <p>Password must:</p>
            <ul>
              {formState.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <Button aria-disabled={isPending} type='submit' className='mt-2 w-full'>
          {isPending ? 'Submitting...' : 'Register'}
        </Button>
      </div>
    </form>
  );
}
