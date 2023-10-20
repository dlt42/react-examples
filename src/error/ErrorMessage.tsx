import { FC } from "react";
import styles from "./ErrorMessage.module.css";

export const getErrorMessage = (error: Error | unknown) =>
  error && error instanceof Error ? error.message : JSON.stringify(error);

export const ErrorMessage: FC<{ error: Error | unknown }> = ({ error }) => (
  <div className={styles.ErrorMessage}>
    <h3>An error has occured</h3>
    <p>{getErrorMessage(error)}</p>
  </div>
);
