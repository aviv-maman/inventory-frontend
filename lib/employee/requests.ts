import { cookies } from 'next/headers';
import { convertObjectValuesToString, createURLString } from '@/lib/utils';
import type { GetStoresRes, ServerError } from '@/types/general';

type GetStoresArgs = { limit?: number; page?: number; name?: string; location?: string; active?: boolean };
export const getStores = async (args?: GetStoresArgs) => {
  const searchParams = convertObjectValuesToString({ ...args, limit: args?.limit || 10, page: args?.page || 1 });
  const url = createURLString(`${process.env.SERVER_URL}/api/store`, searchParams);

  const cookieStore = await cookies();
  const sessionValue = cookieStore.get('session')?.value;

  try {
    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${sessionValue}`,
      },
      cache: 'no-cache',
    });

    const result = await response.json();
    const errors: { [key: string]: string } = {};
    if (result?.error?.errors) {
      Object.keys(result?.error?.errors).forEach((key) => {
        errors[key] = result?.error?.errors[key].message;
      });
    }

    if (!result.success) {
      const message: string =
        result.error._message || result.error.message || 'An error occurred while getting stores.';
      return {
        data: null,
        success: false,
        error: { name: result.error.name || 'getStores Error', message, statusCode: response.status },
      } as ServerError;
    }

    return result as GetStoresRes | ServerError;
  } catch (error) {
    const err = error as Error;
    console.error('Failed to fetch in getStores:', err?.message);
    return {
      data: null,
      success: false,
      error: { statusCode: 500, name: err?.name, message: err?.message },
    } as ServerError;
  }
};
