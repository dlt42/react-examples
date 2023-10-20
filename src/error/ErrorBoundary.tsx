import { Component } from "react";
import { ErrorWithContext, HandleError } from "./ErrorContext";
import { ErrorMessage, getErrorMessage } from "./ErrorMessage";
import styles from "./ErrorBoundary.module.css";

interface IErrorBoundaryState {
  error: Error | null;
}

interface IErrorBoundaryProps {
  children: JSX.Element;
  handleError: HandleError | null;
  currentError: Error | null;
  boundaryLocation: string;
  throwUnhandled: boolean;
  className?: string;
}

export default class ErrorBoundary extends Component<
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
        <button
          onClick={() => {
            clear();
          }}
        >
          Clear
        </button>
      </div>
    ) : (
      children
    );
  }
}
