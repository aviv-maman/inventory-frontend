'use client';

import { Button, Input } from '@heroui/react';
import { useActionState } from 'react';
import { LogIn } from '@/assets/icons';
import { register } from '@/lib/auth';
import type { FormState } from '@/lib/auth/definitions';

export function RegisterForm() {
  const initialState: FormState = { message: '' };
  const [formState, formAction, isPending] = useActionState(register, initialState);

  return (
    <form action={formAction}>
      <div className='flex flex-col gap-2'>
        <div>
          <label htmlFor='firstName'>First Name</label>
          <Input id='firstName' name='firstName' placeholder='John' />
        </div>
        {formState?.errors?.firstName && <p className='text-sm text-red-500'>{formState.errors.firstName}</p>}
        <div>
          <label htmlFor='lastName'>Last Name</label>
          <Input id='lastName' name='lastName' placeholder='Doe' />
        </div>
        {formState?.errors?.lastName && <p className='text-sm text-red-500'>{formState.errors.lastName}</p>}
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
        <div>
          <label htmlFor='passwordConfirmation'>Password Confirmation</label>
          <Input id='passwordConfirmation' name='passwordConfirmation' type='password' placeholder='***' />
        </div>
        {formState?.errors?.passwordConfirmation && (
          <div className='text-sm text-red-500'>
            <p>Password must:</p>
            <ul>
              {formState.errors.passwordConfirmation.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
        <Button
          type='submit'
          aria-disabled={isPending}
          isLoading={isPending}
          className='mt-2 w-full'
          startContent={!isPending && <LogIn className='size-5' />}>
          Register
        </Button>
        {formState?.message && <span className='text-sm text-red-500'>{formState.message}</span>}
      </div>
    </form>
  );
}
