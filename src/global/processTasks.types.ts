import { Result } from 'true-myth';

export type Task<T> = {
  process: () => Promise<T>;
  id: string;
};

type TaskResult<T> = {
  value: T;
  id: string;
};

type TaskError = {
  errorMessage: string;
  id: string;
};

type TaskFailed = {
  failureMessage: string;
};

export type ProcessTaskResult<T> = Result<
  TaskResult<T>,
  TaskError | TaskFailed
>;

export type ProcessTasksResult<T> = {
  results: ProcessTaskResult<T>[];
  batchCount: number;
};
