import { ReactNode, useMemo, useState } from 'react';

import Button from '../../components/Button/Button';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { ErrorWithContext } from '../../global/ErrorWithContext';
import { getErrorMessage } from '../../global/util';
import { ErrorContext } from './errorContext';
import { HandleError } from './errorContext.types';

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
