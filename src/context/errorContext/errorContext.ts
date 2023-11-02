import { createContext } from 'react';

import { ErrorContextType } from './errorContext.types';

export const ErrorContext = createContext<ErrorContextType>(null!);
