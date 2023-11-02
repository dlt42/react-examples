import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';

import { NavRoutes } from './components/NavRoutes/NavRoutes';
import NavContext from './context/navContext';
import { NavData } from './context/navContext.types';
import ErrorBoundary from './error/ErrorBoundary';
import { useError } from './error/useError';
import DataLoader from './global/DataLoader';
import { useAppDispatch } from './hooks/useAppDispatch/useAppDispatch';
import ChartPage from './pages/ChartPage';
import ControlsPage from './pages/ControlsPage';
import ErrorTestPage from './pages/ErrorTestPage';
import ExamplesPage from './pages/ExamplesPage';
import HomePage from './pages/Home';
import JSONViewerPage from './pages/JSONViewerPage';
import LifePage from './pages/LifePage';
import NotFoundPage from './pages/NotFoundPage';
import StatsPage from './pages/StatsPage';

const AppComponent = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    void new DataLoader().loadCountries(appDispatch);
  }, [appDispatch]);
  const navData: NavData = {
    links: [
      { to: '/', label: 'Home' },
      { to: '/examples', label: 'Examples' },
      { to: '/json_viewer', label: 'JSON Viewer' },
      { to: '/country_stats', label: 'World Map' },
      { to: '/sunburst', label: 'Charts' },
      { to: '/controls', label: 'Controls' },
      { to: '/life', label: 'Game of Life' },
      { to: '/errorTest', label: 'Error Test' },
    ],
    routes: [
      { path: '/', element: <HomePage /> },
      { path: '/examples', element: <ExamplesPage /> },
      { path: '/json_viewer', element: <JSONViewerPage /> },
      { path: '/country_stats', element: <StatsPage /> },
      { path: '/sunburst', element: <ChartPage /> },
      { path: '/controls', element: <ControlsPage /> },
      { path: '/life', element: <LifePage /> },
      { path: '/errorTest', element: <ErrorTestPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  };
  return (
    <HashRouter>
      <div className='min-w-[424px] text-center'>
        <div className='dlt-page-body flex max-h-screen flex-col'>
          <NavContext.Provider value={navData}>
            <NavRoutes />
          </NavContext.Provider>
        </div>
      </div>
    </HashRouter>
  );
};

export const App = () => {
  const { handleError } = useError();
  return (
    <ErrorBoundary
      handleError={handleError}
      currentError={null}
      boundaryLocation='AppWrapper'
      throwUnhandled={false}
    >
      <AppComponent />
    </ErrorBoundary>
  );
};

export default App;
