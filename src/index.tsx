import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';
import { ErrorProvider } from './context/errorContext/errorProvider';
import { persistor, store } from './state/store';

const root = createRoot(document.getElementById(`root`) as HTMLElement);

root.render(
  <ErrorProvider>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StrictMode>
          <App />
        </StrictMode>
      </PersistGate>
    </ReduxProvider>
  </ErrorProvider>
);
