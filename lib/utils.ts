import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const convertObjectValuesToString = (obj: { [key: string]: any }) => {
  const result: { [key: string]: string } = {};
  Object.keys(obj).forEach((key) => {
    result[key] = String(obj[key]);
  });
  return result;
};

export const createURLString = (pathname: string, params?: { [key: string]: string }) => {
  const searchParams = new URLSearchParams(params);
  const paramsString = params?.toString();
  const queryString = `${paramsString?.length ? '?' : ''}${searchParams}`;

  return `${pathname}${queryString}`;
};

export const updateURLParams = (params: { [key: string]: string }) => {
  const url = new URL(window.location.href);
  Object.keys(params).forEach((key) => {
    url.searchParams.set(key, params[key]);
  });
  window.history.replaceState({}, '', url.toString());
  window.location.replace(url);
};

/**
 * Artificially delay a response for demo purposes.
 * @param ms
 * @returns
 */
export const artificialDelay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));
