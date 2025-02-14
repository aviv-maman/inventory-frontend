//https://lucide.dev/icons/x
import type { SVGProps } from 'react';

const X: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='remove'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M18 6 6 18' />
      <path d='m6 6 12 12' />
    </svg>
  );
};

export default X;
