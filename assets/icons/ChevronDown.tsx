//https://lucide.dev/icons/chevron-down
import type { SVGProps } from 'react';

const ChevronDown: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='down'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='m6 9 6 6 6-6' />
    </svg>
  );
};

export default ChevronDown;
