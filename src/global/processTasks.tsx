import { logData } from "./util";


/**
 * Processes tasks in batches of 5
 * @param tasks 
 * @returns 
 */
const processTaks = async (tasks: Function[]): Promise<any>  => {
  let results: any[] = [];
  const addResult = (result: any) => {
    results = [...results, ...result];
  }
  while(tasks.length > 0) {
    const subTasks: Function[] = tasks.splice(0, 5 < tasks.length ? 5 : tasks.length);
    const promises: Promise<any>[] = [];
    subTasks.forEach((task) => promises.push(task()));
    await Promise.all(promises).then(addResult);
  }
  return results;
}

const createTask: Function = (id: string): Function => {
  return () => new Promise((resolve, reject) => {
    logData(`Task ${id} started`);
    setTimeout(() => {
      resolve(id);
    	logData(`Task ${id} completed`);
    }, 1000);
  });
}

const runTasks: Function = async () => {
  let results: [] = [];
  logData("RUN TASKS STARTED")
  await processTaks([
    createTask(1),
    createTask(2),
    createTask(3),
    createTask(4),
    createTask(5),
    createTask(6),
    createTask(7),
    createTask(8),
    createTask(9),
    createTask(10),
  ]).then((result: any) => {
    results = result;
    logData("RESULTS:"+results)
    logData('Complete')
  })
  logData("RUN TASKS COMPLETED");
  return results;
}

/*
it('calls every task once and returns the correct result', async () => {
  const results = await runTasks();
  const expectedResult = [1,2,3,4,5,6,7,8,9,10]
  expect(results.length).to.be.equal(10);
  expect(JSON.stringify(results)).to.be.equal(JSON.stringify(expectedResult));
})
*/

export default runTasks;