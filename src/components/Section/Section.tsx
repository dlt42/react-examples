import { FC } from 'react';

import { SectionProps } from './Section.types';

const Section: FC<SectionProps> = ({ children }): JSX.Element => (
  <section className='flex flex-col justify-between gap-1 p-1'>
    {children}
  </section>
);

export default Section;
