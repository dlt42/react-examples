/**
 * #CREATE_CONTEXT
 */

import { Context, createContext } from "react";
import { NavLinkArray } from "./useNav";
import { NavRouteArray } from "./useRoutes";

export interface NavData {
  links: NavLinkArray
  routes: NavRouteArray
};

const NavContext: Context<NavData> = createContext<NavData>({   
  links: [],
  routes: []
});

export default NavContext;