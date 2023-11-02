import { FC } from 'react';

import { NavRoutes } from '../../components/NavRoutes/NavRoutes';

export const useRoutes = (): { NavRoutes: FC<object> } => ({
  NavRoutes,
});
