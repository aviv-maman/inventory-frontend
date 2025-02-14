//https://lucide.dev/icons/calendar-days
import type { SVGProps } from 'react';

const CalendarDays: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      aria-label='calendar'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}>
      <path d='M8 2v4' />
      <path d='M16 2v4' />
      <rect width={18} height={18} x={3} y={4} rx={2} />
      <path d='M3 10h18' />
      <path d='M8 14h.01' />
      <path d='M12 14h.01' />
      <path d='M16 14h.01' />
      <path d='M8 18h.01' />
      <path d='M12 18h.01' />
      <path d='M16 18h.01' />
    </svg>
  );
};

export default CalendarDays;
