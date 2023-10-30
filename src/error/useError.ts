import { useContext } from 'react';

import { ErrorContext } from './ErrorContext';

export const useError = () => useContext(ErrorContext);
