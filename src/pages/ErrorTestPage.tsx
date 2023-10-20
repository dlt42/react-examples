import { FC, useState } from "react";
import AppNav from "../components/Header";
import ErrorBoundary from "../error/ErrorBoundary";
import "./ErrorTestPage.css";
import { useError } from "../error/ErrorContext";

const ErrorProducer = ({ msg, title, description }: { msg?: string; title: string; description: string; }) => {
  const [errorState, setErrorState] = useState(false);
  if (errorState) {
    throw new Error(msg);
  }
  return (
    <div className="InnerBlock">
      <h3>{title}</h3>
      <div className="Description">{description}</div>
      <div className="ErrorProducer">
        <div className="ErrorMsg">Error message to be thrown: {msg} </div>
        <button
          className="ErrorButton"
          onClick={() => {
            setErrorState(true);
          }}
        >
          Click
        </button>
      </div>
    </div>
  );
};

const ErrorTestPage: FC = (): JSX.Element => {
  const { handleError } = useError();
  return (
    <>
      <header>
        <AppNav title="Error Test" />
      </header>
      <main>
        <div className="OuterBlock">
          <ErrorBoundary
            boundaryLocation="Error Test > Content Boundary"
            currentError={null}
            handleError={null}
            throwUnhandled={false}
            className="Block"
          >
            <>
              <ErrorBoundary
                boundaryLocation="Error Test > Block 1 Boundary"
                currentError={null}
                handleError={null}
                throwUnhandled={false}
                className="Block"
              >
                <ErrorProducer msg="Error 1" title="Block 1" description="Error will be caught and handled by block error boundary" />
              </ErrorBoundary>

              <ErrorBoundary
                boundaryLocation="Error Test > Block 2 Boundary"
                currentError={null}
                handleError={null}
                throwUnhandled={true}
                className="Block"
              >
                <ErrorProducer msg="Error 2" title="Block 2" description="Error will be caught by block error boundary and handled by page content error boundary" />
              </ErrorBoundary>

              <ErrorBoundary
                boundaryLocation="Error Test > Block 3 Boundary"
                currentError={null}
                handleError={handleError}
                throwUnhandled={false}
                className="Block"
              >
                <ErrorProducer msg="Error 3" title="Block 3" description="Error will be caught by app error boundary and handled by the error context"/>
              </ErrorBoundary>
            </>
          </ErrorBoundary>
        </div>
      </main>
    </>
  );
};

export default ErrorTestPage;
