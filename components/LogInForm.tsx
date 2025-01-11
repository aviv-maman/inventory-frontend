'use client';

import { Button, Input } from '@nextui-org/react';
import { useActionState } from 'react';
import { LogIn } from '@/assets/icons';
import { login } from '@/lib/auth';

type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export function LoginForm() {
  const initialState: FormState = { message: '' };
  const [formState, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction}>
      <div className='flex flex-col gap-2'>
        <div>
          <label htmlFor='email'>Email</label>
          <Input id='email' name='email' placeholder='example@email.com' type='email' />
          {formState?.errors?.email && <p className='text-sm text-red-500'>{formState.errors.email}</p>}
        </div>
        <div className='mt-4'>
          <div className='flex items-center justify-between'>
            <label htmlFor='password'>Password</label>
          </div>
          <Input id='password' type='password' name='password' placeholder='***' />
          {formState?.errors?.password && <p className='text-sm text-red-500'>{formState.errors.password}</p>}
        </div>
        <Button
          type='submit'
          aria-disabled={isPending}
          isLoading={isPending}
          className='mt-4 w-full'
          startContent={!isPending && <LogIn className='size-5' />}>
          Login
        </Button>
        {formState?.message && <span className='text-sm text-red-500'>{formState.message}</span>}
      </div>
    </form>
  );
}
