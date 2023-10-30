import { FC } from 'react';

import { NavRoutes } from './NavRoutes';

export const useRoutes = (): { NavRoutes: FC<object> } => ({
  NavRoutes,
});
