/**
 * #CONTEXT.PROVIDER
 */

import './App.css';
import { HashRouter } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/Home';
import NavContext, { NavData } from './examples/hooks/custom-nav/navContext';
import Page from './components/Page';
import ExamplesPage from './pages/ExamplesPage';
import JSONViewerPage from './pages/JSONViewerPage';
import StatsPage from './pages/StatsPage';
import ChartPage from './pages/ChartPage';
import { useAppDispatch } from './state/hooks';
import { useEffect } from 'react';
import DataLoader from './global/DataLoader';
import ControlsPage from './pages/ControlsPage';
import LifePage from './pages/LifePage';
import { useError } from './error/ErrorContext';
import ErrorBoundary from './error/ErrorBoundary';
import ErrorTestPage from './pages/ErrorTestPage';

const AppComponent = () => {
  const appDispatch = useAppDispatch();
  useEffect(() => { 
    new DataLoader().loadCountries(appDispatch)
  }, [appDispatch]);
  const navData: NavData = { 
    links: [
      { to: '/', label: 'Home' },
      { to: '/examples', label: 'Examples' },
      { to: '/json_viewer', label: 'JSON Viewer' },
      { to :'/country_stats', label: 'World Map' },
      { to :'/sunburst', label: 'Charts' },
      { to :'/controls', label: 'Controls' },
      { to :'/life', label: 'Game of Life' },
      { to :'/errorTest', label: 'Error Test' }
    ], 
    routes: [
      { path: '/', element: <HomePage /> },
      { path: '/examples', element: <ExamplesPage /> },
      { path: '/json_viewer', element: <JSONViewerPage />},
      { path: '/country_stats', element: <StatsPage />},
      { path: '/sunburst', element: <ChartPage />},
      { path: '/controls', element: <ControlsPage />},
      { path: '/life', element: <LifePage />},
      { path: '/errorTest', element: <ErrorTestPage />},
      { path: '*', element: <NotFoundPage/> }
    ]
  };
  return (
    <HashRouter>
      <div className="App">
        <div className="Page-Body">
          <NavContext.Provider value={navData}>
            <Page />
          </NavContext.Provider>
        </div>
      </div>
    </HashRouter>
  );
}

export const App = () => {
  const { handleError } = useError();
  return (
    <ErrorBoundary
      handleError={handleError}
      currentError={null}
      boundaryLocation="AppWrapper"
      throwUnhandled={false}
    >
      <AppComponent />
    </ErrorBoundary>
  );
};

export default App;