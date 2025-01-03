//https://lucide.dev/icons/ellipsis
import type { SVGProps } from 'react';

const Ellipsis: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='ellipsis'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <circle cx={12} cy={12} r={1} />
      <circle cx={19} cy={12} r={1} />
      <circle cx={5} cy={12} r={1} />
    </svg>
  );
};

export default Ellipsis;
