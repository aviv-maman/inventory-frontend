'use server';

import { type FormState, LoginFormSchema, RegisterFormSchema } from '@/lib/auth/definitions';

export async function register(state: FormState, formData: FormData): Promise<FormState> {
  // Validate form fields
  const validatedFields = RegisterFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Prepare data for insertion into database
  const { name, email, password } = validatedFields.data;

  const user = { id: 1 };

  if (!user) {
    return {
      message: 'An error occurred while creating your account.',
    };
  }
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  const errorMessage = { message: 'Invalid login credentials.' };

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Query the database for the user with the given email
  // const user = await db.query.users.findFirst({
  //   where: eq(users.email, validatedFields.data.email),
  // });

  const user = { id: 1, password: 'aaaa' };

  // If user is not found, return early
  if (!user) {
    return errorMessage;
  }

  // If login successful, create a session for the user and redirect
  const userId = user.id.toString();
}

export async function logout() {}
