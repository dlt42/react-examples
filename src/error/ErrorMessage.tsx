import { FC } from 'react';

import styles from './ErrorMessage.module.css';
import { getErrorMessage } from './utils';

type ErrorMessageProps = { error: Error };

export const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => (
  <div className={styles.ErrorMessage}>
    <h3>An error has occured</h3>
    <p>{getErrorMessage(error)}</p>
  </div>
);
