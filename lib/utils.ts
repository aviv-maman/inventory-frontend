import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertObjectValuesToString = (obj: { [key: string]: any }) => {
  const result: { [key: string]: string } = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key]) {
      result[key] = String(obj[key]);
    }
  });
  return result;
};

export const createURLString = (pathname: string, params?: { [key: string]: string }) => {
  const searchParams = new URLSearchParams(params);
  const paramsString = params?.toString();
  const queryString = `${paramsString?.length ? '?' : ''}${searchParams}`;

  return `${pathname}${queryString}`;
};

type UpdateParamsArgs = {
  params: { [key: string]: string | undefined };
  redirect?: boolean;
};
export const updateURLParams = (args: UpdateParamsArgs) => {
  const url = new URL(window.location.href);
  Object.keys(args.params).forEach((key) => {
    if (args.params[key]) {
      url.searchParams.set(key, args.params[key]);
    } else {
      url.searchParams.delete(key, args.params[key]);
    }
  });
  window.history.pushState({}, '', url.toString());
  if (args.redirect) {
    window.location.replace(url);
  }
};

/**
 * Artificially delay a response for demo purposes.
 * @param ms
 * @returns
 */
export const artificialDelay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

export function toBase64(str: string) {
  return typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);
}
