import { FC } from 'react';

import useNav from '../../hooks/useNav/useNav';
import { HeaderProps } from './Header.types';

const Header: FC<HeaderProps> = ({ title }): JSX.Element => {
  const { Nav } = useNav();
  document.title = title;
  return (
    <>
      <div className='p-6 text-4xl font-bold'>{title}</div>
      <Nav />
    </>
  );
};

export default Header;
