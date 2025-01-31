import { z } from 'zod';

export const AddProductFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }).trim(),
  description: z.string().min(2, { message: 'Description must be at least 2 characters long.' }).trim(),
  fullPrice: z.number().positive({ message: 'Price must be a positive number' }),
  discountPercentage: z.number().positive({ message: 'Discount percentage must be a positive number' }),
});

export type AddProductFormState =
  | {
      errors?: {
        name?: string[];
        description?: string[];
        fullPrice?: string[];
        discountPercentage?: string[];
      };
      message?: string;
    }
  | undefined;

export const UpdateStockFormSchema = z.object({
  id: z.string().min(3, { message: 'ID must be at least 3 characters long.' }).trim(),
  stock: z.number().nonnegative({ message: 'Stock must be non negative.' }),
});

export type UpdateStockFormState =
  | {
      errors?: {
        id?: string[];
        stock?: string[];
      };
      message?: string;
    }
  | undefined;
