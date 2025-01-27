'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type FormState, LoginFormSchema, RegisterFormSchema } from '@/lib/auth/definitions';

export const register = async (state: FormState, formData: FormData): Promise<FormState> => {
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
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password, passwordConfirmation }),
    });
    const result = await response.json();

    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      const errorMessage: string =
        result.error._message || result.error.message || 'An error occurred while creating your account.';
      return {
        errors,
        message: errorMessage,
      };
    }

    const cookiesArr = response.headers.getSetCookie();
    const cookieValue = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('=')[1]
      ?.split(';')[0];
    const path = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('Path'))
      ?.split('=')[1];
    const expires = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('Expires'))
      ?.split('=')[1];
    const httpOnly = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('HttpOnly'))
      ? true
      : false;
    const secure = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('Secure'))
      ? true
      : false;
    const rawSameSite = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('SameSite'))
      ?.split('=')[1];
    const sameSite = rawSameSite ? (rawSameSite.toLowerCase() as 'lax' | 'strict' | 'none') : undefined;

    if (cookieValue) {
      (await cookies()).set('session', cookieValue, {
        httpOnly,
        secure,
        expires: new Date(expires || ''),
        sameSite,
        path,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return { message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export const login = async (state: FormState, formData: FormData): Promise<FormState> => {
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
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();

    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      const errorMessage: string =
        result.error._message || result.error.message || 'An error occurred while logging into your account.';
      return {
        errors,
        message: errorMessage, //result.error.message can be too long in ValidationError
      };
    }

    const cookiesArr = response.headers.getSetCookie();
    const cookieValue = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('=')[1]
      ?.split(';')[0];
    const path = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('Path'))
      ?.split('=')[1];
    const expires = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('Expires'))
      ?.split('=')[1];
    const httpOnly = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('HttpOnly'))
      ? true
      : false;
    const secure = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('Secure'))
      ? true
      : false;
    const rawSameSite = cookiesArr
      .find((cookiesArr) => cookiesArr.includes('session'))
      ?.split('; ')
      .find((item) => item.includes('SameSite'))
      ?.split('=')[1];
    const sameSite = rawSameSite ? (rawSameSite.toLowerCase() as 'lax' | 'strict' | 'none') : undefined;

    if (cookieValue) {
      (await cookies()).set('session', cookieValue, {
        httpOnly,
        secure,
        expires: new Date(expires || ''),
        sameSite,
        path,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return { message };
  }

  revalidatePath('/', 'layout');
  redirect('/');
};

export async function logout() {
  try {
    const response = await fetch(`${process.env.SERVER_URL}/api/auth/logout`);
    const result = await response.json();

    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      const errorMessage: string =
        result.error._message || result.error.message || 'An error occurred while logging out.';
      return {
        message: errorMessage,
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Something went wrong';
    return { message };
  }

  const cookieStore = await cookies();
  cookieStore.delete('session');
  revalidatePath('/', 'layout');
}
