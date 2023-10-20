/**
 * #USE_CONTEXT
 */

import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { ToArrayStrict } from "../../../global/types";
import NavContext, { NavData } from "./navContext";
import styles from "./useNav.module.css";

interface NavLinkProps {
  label: string;
  to: string;
}

export type NavLinkArray = ToArrayStrict<NavLinkProps>;

const Nav: FC = (): JSX.Element => {
  const { links } = useContext<NavData>(NavContext);
  return (
    <nav>
      <ul className={styles.NavList}>
        {links.map((link, i): JSX.Element => {
          const { to, label } = link;
          return (
            <li key={`${i}_${to}`} className={styles.NavLink}>
              <Link to={to}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const useNav = (): { Nav: FC } => ({
  Nav,
});

export default useNav;
