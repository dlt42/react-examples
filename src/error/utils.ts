export const getErrorMessage = (error: unknown) =>
  error && error instanceof Error ? error.message : JSON.stringify(error);
