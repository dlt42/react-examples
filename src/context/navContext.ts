import { Context, createContext } from 'react';

import { NavData } from './navContext.types';

const NavContext: Context<NavData> = createContext<NavData>({
  links: [],
  routes: [],
});

export default NavContext;
