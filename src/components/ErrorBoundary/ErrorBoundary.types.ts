import { HandleError } from '../../context/errorContext/errorContext.types';

export type ErrorBoundaryState = {
  error: Error | null;
};

export type ErrorBoundaryProps = {
  children: JSX.Element;
  handleError: HandleError | null;
  currentError: Error | null;
  boundaryLocation: string;
  throwUnhandled: boolean;
  className?: string;
};
