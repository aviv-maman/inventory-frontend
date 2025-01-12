'use server';

import { redirect } from 'next/navigation';
import { type FormState, LoginFormSchema, RegisterFormSchema } from '@/lib/auth/definitions';

export async function register(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = RegisterFormSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, password, passwordConfirmation } = validatedFields.data;

  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password, passwordConfirmation }),
    });
    const data = await res.json();
    if (!res.ok) {
      return {
        message: data.message || 'An error occurred while creating your account.',
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return { message };
  }

  redirect('/');
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        message: data.message || 'An error occurred while creating your account.',
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return { message };
  }

  redirect('/');
}

export async function logout() {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/api/auth/logout`);
    const data = await res.json();

    if (!res.ok) {
      return {
        message: data.message || 'An error occurred while logging out.',
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return { message };
  }

  redirect('/');
}
