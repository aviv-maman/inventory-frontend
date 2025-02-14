//https://lucide.dev/icons/calendar-clock
import type { SVGProps } from 'react';

const CalendarClock: React.FC<SVGProps<SVGSVGElement>> = (props) => {
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
      <path d='M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5' />
      <path d='M16 2v4' />
      <path d='M8 2v4' />
      <path d='M3 10h5' />
      <path d='M17.5 17.5 16 16.3V14' />
      <circle cx={16} cy={16} r={6} />
    </svg>
  );
};

export default CalendarClock;
