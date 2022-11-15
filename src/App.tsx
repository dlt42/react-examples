/**
 * #CONTEXT.PROVIDER
 */

import './App.css';
import { BrowserRouter } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/Home';
import NavContext, { NavData } from './examples/hooks/custom-nav/navContext';
import Page from './components/Page';
import ExamplesPage from './pages/ExamplesPage';
import JSONViewerPage from './pages/JSONViewerPage';
import StatsPage from './pages/StatsPage';
import ChartPage from './pages/ChartPage';

function App() {
  const navData: NavData = { 
    links: [
      { to: '/', label: 'Home' },
      { to: '/examples', label: 'Examples' },
      { to: '/json_viewer', label: 'JSON Viewer' },
      { to :'/country_stats', label: 'World Map' },
      { to :'/sunburst', label: 'Charts' } 
    ], 
    routes: [
      { path: '/', element: <HomePage /> },
      { path: '/examples', element: <ExamplesPage /> },
      { path: '/json_viewer', element: <JSONViewerPage />},
      { path: '/country_stats', element: <StatsPage />},
      { path: '/sunburst', element: <ChartPage />},
      { path: '*', element: <NotFoundPage/> }
    ]
  };
  return (
    <BrowserRouter>
      <div className="App">
        <div className="Page-Body">
          <NavContext.Provider value={navData}>
            <Page />
          </NavContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;