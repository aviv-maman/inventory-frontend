//https://lucide.dev/icons/rotate-cw
import type { SVGProps } from 'react';

const Reload: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='reload'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8' />
      <path d='M21 3v5h-5' />
    </svg>
  );
};

export default Reload;
