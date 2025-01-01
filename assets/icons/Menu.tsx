//https://lucide.dev/icons/menu
import type { SVGProps } from 'react';

const Menu: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='menu'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <line x1={4} x2={20} y1={12} y2={12} />
      <line x1={4} x2={20} y1={6} y2={6} />
      <line x1={4} x2={20} y1={18} y2={18} />
    </svg>
  );
};

export default Menu;
