//https://lucide.dev/icons/computer
import type { SVGProps } from 'react';

const Computer: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='computer'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <rect width={14} height={8} x={5} y={2} rx={2} />
      <rect width={20} height={8} x={2} y={14} rx={2} />
      <path d='M6 18h2' />
      <path d='M12 18h6' />
    </svg>
  );
};

export default Computer;
