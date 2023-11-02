import { createContext, ReactNode, useMemo, useState } from 'react';

import Button from '../components/Button/Button';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';
import { getErrorMessage } from './utils';

export type HandleError = (error: Error | null) => void;

export class ErrorWithContext extends Error {
  public context: string;

  constructor(msg: string, context: string) {
    super(`${context}: ${msg}`);
    this.context = context;
    Object.setPrototypeOf(this, ErrorWithContext.prototype);
  }
}

type ErrorContextType = {
  error: Error | null;
  handleError: HandleError;
};

export const ErrorContext = createContext<ErrorContextType>(null!);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<Error | null>(null);
  const value = useMemo(() => {
    const handleError: HandleError = (errorToHandle) => {
      setError(
        new ErrorWithContext(getErrorMessage(errorToHandle), 'ErrorContext')
      );
    };
    return { error, handleError };
  }, [error]);
  return (
    <ErrorContext.Provider value={value}>
      {error !== null ? (
        <div className='m-5 text-center'>
          Error handled by error context: <ErrorMessage error={error} />
          <Button
            onClick={() => {
              setError(null);
            }}
          >
            Clear
          </Button>
        </div>
      ) : (
        children
      )}
    </ErrorContext.Provider>
  );
}
