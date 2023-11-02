import { useContext } from 'react';

import { ErrorContext } from '../../context/errorContext/errorContext';

export const useError = () => useContext(ErrorContext);
