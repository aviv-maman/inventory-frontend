//https://lucide.dev/icons/plus
import type { SVGProps } from 'react';

const Plus: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='plus'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M5 12h14' />
      <path d='M12 5v14' />
    </svg>
  );
};

export default Plus;
