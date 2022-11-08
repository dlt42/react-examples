/**
 * #CREATE_CONTEXT
 */

import React from "react";
import { NavLinkArray } from "./useNav";
import { NavRouteArray } from "./useRoutes";

export interface NavData {
  links: NavLinkArray
  routes: NavRouteArray
};

const NavContext: React.Context<NavData> = React.createContext<NavData>({   
  links: [],
  routes: []
});

export default NavContext;