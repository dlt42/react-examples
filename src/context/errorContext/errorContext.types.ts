export type HandleError = (error: Error | null) => void;

export type ErrorContextType = {
  error: Error | null;
  handleError: HandleError;
};
