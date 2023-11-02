import { Result } from 'true-myth';

import {
  ProcessTaskResult,
  ProcessTasksResult,
  Task,
} from './processTasks.types';
import { getErrorMessage } from './util';

const processTasks = async <T>(
  tasks: Task<T>[],
  batchSize: number
): Promise<ProcessTasksResult<T>> => {
  const results: ProcessTaskResult<T>[] = [];
  let batchCount = 0;
  while (tasks.length) {
    const subTasks = tasks.splice(
      0,
      batchSize < tasks.length ? batchSize : tasks.length
    );
    const promises: Promise<ProcessTaskResult<T>>[] = subTasks.map((task) => {
      const { id, process } = task;
      return process()
        .then((value): ProcessTaskResult<T> => Result.ok({ value, id }))
        .catch(
          (e): ProcessTaskResult<T> =>
            Result.err({ errorMessage: getErrorMessage(e), id })
        );
    });
    const batchResult = await Promise.allSettled(promises);
    results.push(
      ...batchResult.map((item) => {
        if (item.status === 'fulfilled') {
          return item.value;
        }
        const result: ProcessTaskResult<T> = Result.err({
          failureMessage: item.reason,
        });
        return result;
      })
    );
    batchCount++;
  }
  return { results, batchCount };
};

export default processTasks;
