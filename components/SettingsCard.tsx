import { Card, CardBody, CardHeader } from '@heroui/react';
import SelectTheme from '@/components/SelectTheme';

const SettingsCard: React.FC = () => {
  return (
    <Card className='gap-y-4 border p-2' isBlurred shadow='lg'>
      <CardHeader className='block'>
        <p className='text-xl font-semibold'>General</p>
        <span className='text-sm'>Change General Settings</span>
      </CardHeader>
      <CardBody className='grid gap-6 sm:grid-cols-3'>
        <div className='grid gap-3'>
          <SelectTheme />
        </div>
      </CardBody>
    </Card>
  );
};

export default SettingsCard;
