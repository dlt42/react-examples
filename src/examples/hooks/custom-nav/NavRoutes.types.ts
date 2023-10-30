import { ToArrayStrict } from '../../../global/types';

export type NavRouteProps = {
  path: string;
  element: JSX.Element;
};

export type NavRouteArray = ToArrayStrict<NavRouteProps>;
