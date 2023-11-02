import { ToArrayStrict } from '../../global/types';

type NavLinkProps = {
  label: string;
  to: string;
};

export type NavLinkArray = ToArrayStrict<NavLinkProps>;
