//https://lucide.dev/icons/loader-circle
import type { SVGProps } from 'react';

const LoaderCircle: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='loading'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  );
};

export default LoaderCircle;
