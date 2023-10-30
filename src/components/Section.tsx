import { FC } from 'react';

type SectionProps = {
  children: JSX.Element | JSX.Element[];
};

const Section: FC<SectionProps> = ({ children }): JSX.Element => (
  <section className='flex flex-col justify-between p-1'>{children}</section>
);

export default Section;
