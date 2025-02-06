import Image from 'next/image';

const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  return (
    <div className='flex items-start'>
      <div className='flex flex-row gap-4 pt-4 xl:flex-col xl:pt-0'>
        {images.map((image, index) => {
          return (
            <div key={`${index}-${image}`} id={`${index}-${image}`}>
              {!!image && (
                <Image
                  src={image}
                  priority={index <= 2 ? true : false}
                  width={100}
                  height={100}
                  className='inset-0 rounded sm:size-[100px]'
                  alt={`Product Image ${index + 1}`}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
