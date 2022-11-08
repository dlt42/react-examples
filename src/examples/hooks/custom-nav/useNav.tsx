/**
 * #USE_CONTEXT
 */

import React from "react";
import { Link } from "react-router-dom";
import { ToArrayStrict } from "../../../global/types";
import NavContext, { NavData } from "./navContext";
import styles from  './useNav.module.css';

export interface NavLinkProps {
  label: string,
  to: string
}

export type NavLinkArray = ToArrayStrict<NavLinkProps>;

const Nav: React.FC<{}> = (): JSX.Element => {
  const { links } = React.useContext<NavData>(NavContext);
  return (
    <nav>
      <ul className={styles.NavList}>
        {
          links.map((link: NavLinkProps, i): JSX.Element => {
            const { to, label } = link;
            return (
              <li key={ `${i}_${to}`} className={styles.NavLink}>
                <Link to={to}>{label}</Link>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export const useNav = (): { Nav: React.FC<{}> } => {
  return {
    Nav
  };
};

export default useNav;