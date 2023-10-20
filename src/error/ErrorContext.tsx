import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { ErrorMessage, getErrorMessage } from "./ErrorMessage";
import styles from "./ErrorContext.module.css";

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

const ErrorContext = createContext<ErrorContextType>(null!);

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [error, setError] = useState<Error | null>(null);
  const value = useMemo(() => {
    const handleError: HandleError = (errorToHandle) => {
      setError(
        new ErrorWithContext(getErrorMessage(errorToHandle), "ErrorContext")
      );
    };
    return { error, handleError };
  }, [error]);
  return (
    <ErrorContext.Provider value={value}>
      {error !== null ? (
        <>
          <div className={styles.ErrorContext}>
            Error handled by error context: <ErrorMessage error={error} />
            <button
              onClick={() => {
                setError(null);
              }}
            >
              Clear
            </button>
          </div>
        </>
      ) : (
        children
      )}
    </ErrorContext.Provider>
  );
}

export const useError = () => useContext(ErrorContext);
