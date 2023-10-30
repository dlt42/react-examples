import { Component } from 'react';

import Button from '../components/Button';
import styles from './ErrorBoundary.module.css';
import { ErrorWithContext, HandleError } from './ErrorContext';
import { ErrorMessage } from './ErrorMessage';
import { getErrorMessage } from './utils';

type IErrorBoundaryState = {
  error: Error | null;
};

type IErrorBoundaryProps = {
  children: JSX.Element;
  handleError: HandleError | null;
  currentError: Error | null;
  boundaryLocation: string;
  throwUnhandled: boolean;
  className?: string;
};

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { error: props.currentError };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    const { handleError, boundaryLocation, throwUnhandled } = this.props;
    this.setState({ error });
    if (handleError === null) {
      if (throwUnhandled) {
        throw error;
      }
      return;
    }
    const msg = getErrorMessage(error);
    const context = `Error caught by ErrorBoundary in ${boundaryLocation}`;
    handleError(new ErrorWithContext(msg, context));
  }

  public render(): JSX.Element {
    const { children } = this.props;
    const { error } = this.state;
    const { throwUnhandled, handleError, boundaryLocation, className } =
      this.props;
    const clear = () => {
      this.setState({ error: null });
    };
    return error && !handleError && !throwUnhandled ? (
      <div className={className && styles.ErrorBoundary}>
        Error handled by ErrorBoundary in {boundaryLocation}:
        <ErrorMessage error={error} />
        <Button
          onClick={() => {
            clear();
          }}
        >
          Clear
        </Button>
      </div>
    ) : (
      children
    );
  }
}

export default ErrorBoundary;
