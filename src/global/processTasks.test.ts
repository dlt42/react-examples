import { expect, it } from 'vitest';

import processTasks from './processTasks';
import { Task } from './processTasks.types';

const createTask = (id: string): Task<string> => {
  return {
    process: () =>
      new Promise((resolve, reject) => {
        setTimeout(
          () => {
            if (Number.isInteger(Number.parseInt(id))) {
              resolve(id);
            }
            reject(new Error(id));
          },
          Math.random() * 50 + 100
        );
      }),
    id,
  };
};

const runTasks = async (ids: string[], batchSize: number) =>
  await processTasks(
    ids.map((id) => createTask(id)),
    batchSize
  );

it('calls every task once and returns the correct result', async () => {
  const ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const { results, batchCount } = await runTasks(ids, 3);
  expect(batchCount).to.equal(4);
  expect(
    results
      .map((result) =>
        result.isOk ? result.value.value : JSON.stringify(result.error)
      )
      .join(',')
  ).to.equal(`1,2,3,4,5,6,7,8,9,10`);
}, 10000);

it('calls every task once and returns the correct result - one of the task returns an error', async () => {
  const ids = ['1', '2', '3', '4', 'A', '6', '7', '8', '9', '10'];
  const { results, batchCount } = await runTasks(ids, 2);
  expect(batchCount).to.equal(5);
  expect(
    results
      .map((result) =>
        result.isOk ? result.value.value : JSON.stringify(result.error)
      )
      .join(',')
  ).to.equal(`1,2,3,4,{"errorMessage":"A","id":"A"},6,7,8,9,10`);
}, 10000);
