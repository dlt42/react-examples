import { FC } from 'react';

type DescriptionProps = {
  text: string;
};

const Description: FC<DescriptionProps> = ({ text }): JSX.Element => (
  <div className='flex justify-center gap-4'>
    <span className='p-4 text-lg font-bold'>{text}</span>
  </div>
);

export default Description;
