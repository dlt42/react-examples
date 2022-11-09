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

function App() {
  const navData: NavData = { 
    links: [
      { to: '/', label: 'Home' },
      { to: '/examples', label: 'Examples' },
      { to: '/json_viewer', label: 'JSON Viewer' }
    ], 
    routes: [
      { path: '/', element: <HomePage /> },
      { path: '/examples', element: <ExamplesPage /> },
      { path: '/json_viewer', element: <JSONViewerPage />},
      { path: '*', element: <NotFoundPage/> }
    ]
  };
  return (
    <BrowserRouter>
      <div className="App">
        <div id="page-body">
          <NavContext.Provider value={navData}>
            <Page />
          </NavContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;