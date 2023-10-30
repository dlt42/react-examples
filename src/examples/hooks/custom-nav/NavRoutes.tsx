import { FC, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

import NavContext, { NavData } from './navContext';
import { NavRouteProps } from './NavRoutes.types';

export const NavRoutes: FC = (): JSX.Element => {
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
