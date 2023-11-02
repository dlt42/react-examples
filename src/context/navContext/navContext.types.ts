import { NavRouteProps } from '../../components/NavRoutes/NavRoutes.types';
import { ToArrayStrict } from '../../global/types';
import { NavLinkArray } from '../../hooks/useNav/useNav.types';

type NavRouteArray = ToArrayStrict<NavRouteProps>;

export type NavData = {
  links: NavLinkArray;
  routes: NavRouteArray;
};
