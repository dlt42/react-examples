import { FC } from 'react';

import { DescriptionProps } from './Description.types';

const Description: FC<DescriptionProps> = ({ text }): JSX.Element => (
  <div className='flex justify-center gap-4'>
    <span className='p-4 text-lg font-bold'>{text}</span>
  </div>
);

export default Description;
