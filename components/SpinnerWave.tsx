import '@/styles/spinkit.css';

const SpinnerWave: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return (
    <div className='flex justify-center' aria-label='loading' {...props}>
      <div className='sk-wave'>
        <div className='sk-wave-rect' />
        <div className='sk-wave-rect' />
        <div className='sk-wave-rect' />
        <div className='sk-wave-rect' />
        <div className='sk-wave-rect' />
      </div>
    </div>
  );
};

export default SpinnerWave;
