import { Button, Input, type InputProps } from '@heroui/react';
import { Search2 } from '@/assets/icons';
import { cn } from '@/lib/utils';

interface SearchInputProps extends InputProps {
  isIconOnly?: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ className, isIconOnly, ...props }) => {
  return isIconOnly ? (
    <Input type='button' size='sm' className='size-8 bg-transparent' {...props}>
      <Search2 className='size-4' />
    </Input>
  ) : (
    <Input
      variant='bordered'
      placeholder='Search...'
      endContent={
        <Button variant='flat' color='primary' size='sm' isIconOnly className='size-7'>
          <Search2 className='size-4' />
        </Button>
      }
      size='sm'
      className={cn(
        'w-full whitespace-nowrap rounded-md p-2 text-sm font-normal shadow-none transition-colors sm:w-64',
        className,
      )}
      classNames={{ inputWrapper: 'pr-0' }}
      {...props}></Input>
  );
};
SearchInput.displayName = 'SearchInput';

export default SearchInput;
