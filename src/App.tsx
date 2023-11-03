import { useEffect } from 'react';
import { HashRouter } from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { NavData } from './context/navContext/navContext.types';
import NavProvider from './context/navContext/navProvider';
import { useAppDispatch } from './hooks/useAppDispatch/useAppDispatch';
import { useError } from './hooks/useError/useError';
import ChartPage from './pages/chart-page/ChartPage';
import ControlsPage from './pages/controls-page/ControlsPage';
import ErrorTestPage from './pages/error-test-page/ErrorTestPage';
import ExamplesPage from './pages/examples-page/ExamplesPage';
import HomePage from './pages/home-page/Home';
import JSONViewerPage from './pages/json-viewer-page/JSONViewerPage';
import LifePage from './pages/life-page/LifePage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import WorldMapPage, { loadCountries } from './pages/world-map-page/WorldMap';

const AppComponent = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => {
    void loadCountries(appDispatch);
  }, [appDispatch]);
  const navData: NavData = {
    links: [
      { to: '/', label: 'Home' },
      { to: '/examples', label: 'Examples' },
      { to: '/json_viewer', label: 'JSON Viewer' },
      { to: '/world_map', label: 'World Map' },
      { to: '/charts', label: 'Charts' },
      { to: '/controls', label: 'Controls' },
      { to: '/life', label: 'Game of Life' },
      { to: '/errorTest', label: 'Error Test' },
    ],
    routes: [
      { path: '/', element: <HomePage /> },
      { path: '/examples', element: <ExamplesPage /> },
      { path: '/json_viewer', element: <JSONViewerPage /> },
      { path: '/world_map', element: <WorldMapPage /> },
      { path: '/charts', element: <ChartPage /> },
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
          <NavProvider navData={navData} />
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
