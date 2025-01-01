//https://lucide.dev/icons/moon
import type { SVGProps } from 'react';

const Moon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='moon'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
    </svg>
  );
};

export default Moon;
