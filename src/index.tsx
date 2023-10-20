import ReactDOM from "react-dom/client";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./state/store";
import { Provider as ReduxProvider } from "react-redux";
import runTasks from "./global/processTasks";
import { ErrorProvider } from "./error/ErrorContext";
import { App } from "./App";
import { StrictMode } from "react";

runTasks();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

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
