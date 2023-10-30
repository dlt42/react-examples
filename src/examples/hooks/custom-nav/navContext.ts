import { Context, createContext } from 'react';

import { NavRouteArray } from './NavRoutes.types';
import { NavLinkArray } from './useNav.types';

export type NavData = {
  links: NavLinkArray;
  routes: NavRouteArray;
};

const NavContext: Context<NavData> = createContext<NavData>({
  links: [],
  routes: [],
});

export default NavContext;
