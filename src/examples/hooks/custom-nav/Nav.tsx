import { FC, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import NavContext, { NavData } from './navContext';
import styles from './useNav.module.css';

const Nav: FC = (): JSX.Element => {
  const { links } = useContext<NavData>(NavContext);
  const location = useLocation();

  return (
    <>
      <nav>
        <ul className={styles.NavList}>
          {links.map((link, i): JSX.Element => {
            const { to, label } = link;
            return (
              <li
                key={`${i}_${to}`}
                className={
                  to === location.pathname
                    ? styles.NavLinkCurrent
                    : styles.NavLink
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
