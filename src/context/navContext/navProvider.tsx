import { NavRoutes } from '../../components/NavRoutes/NavRoutes';
import NavContext from './navContext';
import { NavData } from './navContext.types';

const NavProvider = ({ navData }: { navData: NavData }) => (
  <NavContext.Provider value={navData}>
    <NavRoutes />
  </NavContext.Provider>
);

export default NavProvider;
