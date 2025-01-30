import { z } from 'zod';

export const AddEmployeeFormSchema = z
  .object({
    firstName: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
    lastName: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
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
    active: z.string().trim(),
  })
  .refine(
    (values) => {
      return values.password === values.passwordConfirmation;
    },
    { message: `match to the password confirmation`, path: ['passwordConfirmation'] },
  );

export type AddEmployeeFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        passwordConfirmation?: string[];
        active?: string[];
      };
      message?: string;
    }
  | undefined;

export const AddStoreFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  location: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  active: z.string().trim(),
});

export type AddStoreFormState =
  | {
      errors?: {
        name?: string[];
        location?: string[];
        active?: string[];
      };
      message?: string;
    }
  | undefined;

export const EditStoreFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  location: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  active: z.string().trim(),
});

export type EditStoreFormState =
  | {
      errors?: {
        name?: string[];
        location?: string[];
        active?: string[];
      };
      message?: string;
    }
  | undefined;
