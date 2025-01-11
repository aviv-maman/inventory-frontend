import { z } from 'zod';

export const RegisterFormSchema = z
  .object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters long.' }).trim(),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long.' }).trim(),
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
    passwordConfirmation: z.string().min(8, { message: 'Be at least 8 characters long' }).trim(),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirmation;
    },
    { message: `match to the password confirmation`, path: ['passwordConfirmation'] },
  );

export const LoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password field must not be empty.' }),
});

export type FormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        passwordConfirmation?: string[];
      };
      message?: string;
    }
  | undefined;

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
