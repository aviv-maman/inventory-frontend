//https://lucide.dev/icons/linkedin
import type { SVGProps } from 'react';

const LinkedIn2: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='linkedin'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
      <rect width={4} height={12} x={2} y={9} />
      <circle cx={4} cy={4} r={2} />
    </svg>
  );
};

export default LinkedIn2;
