/**
 * #USE_CONTEXT
 */

import { FC, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToArrayStrict } from "../../../global/types";
import NavContext, { NavData } from "./navContext";

interface NavRouteProps {
  path: string;
  element: JSX.Element;
}

export type NavRouteArray = ToArrayStrict<NavRouteProps>;

const NavRoutes: FC = (): JSX.Element => {
  const { routes } = useContext<NavData>(NavContext);
  return (
    <Routes>
      {routes.map(
        ({ path, element }: NavRouteProps, i: number): JSX.Element => (
          <Route key={`${i}_${path}`} path={path} element={element} />
        )
      )}
    </Routes>
  );
};

export const useRoutes = (): { NavRoutes: React.FC<{}> } => ({
  NavRoutes,
});
