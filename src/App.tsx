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

function App() {
  const navData: NavData = { 
    links: [
      { to: '/', label: 'Home' },
      { to: '/examples', label: 'Examples' }
    ], 
    routes: [
      { path: '/', element: <HomePage /> },
      { path: '/examples', element: <ExamplesPage /> },
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