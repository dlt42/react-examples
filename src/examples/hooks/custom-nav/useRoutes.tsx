/**
 * #USE_CONTEXT
 */

import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToArrayStrict } from "../../../global/types";
import NavContext, { NavData } from "./navContext";

export interface NavRouteProps {
  path: string,
  element: JSX.Element
}

export type NavRouteArray = ToArrayStrict<NavRouteProps>;

const NavRoutes: React.FC<{}> = (): JSX.Element => {
  const { routes } = React.useContext<NavData>(NavContext);
  return (
    <Routes>
      {
        routes.map((route: NavRouteProps, i: number): JSX.Element => {
          const { path, element } = route;
          return ( 
            <Route 
              key={`${i}_${path}`} 
              path={path} 
              element={ element } />
          )
        })
      }
    </Routes>
  )
}

export const useRoutes = (): { NavRoutes: React.FC<{}> }  => {
  return {
    NavRoutes
  };
};