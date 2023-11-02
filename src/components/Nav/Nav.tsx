import './Nav.css';

import { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import NavContext from '../../context/navContext';

const Nav: FC = (): JSX.Element => {
  const { links } = useContext(NavContext);
  const location = useLocation();

  return (
    <>
      <nav>
        <ul className='NavList'>
          {links.map((link, i): JSX.Element => {
            const { to, label } = link;
            return (
              <li
                key={`${i}_${to}`}
                className={
                  to === location.pathname ? 'NavLink Current' : 'NavLink'
                }
              >
                <Link to={to}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
