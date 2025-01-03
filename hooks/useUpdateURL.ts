import { useRouter } from 'next/navigation';

type State = {
  [key: string]: string;
};

export const useUpdateURL = () => {
  const router = useRouter();

  return (state: State) => {
    const newParams = new URLSearchParams(window.location.search);
    Object.entries(state).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    router.push(`?${newParams.toString()}`, { scroll: false });
  };
};
