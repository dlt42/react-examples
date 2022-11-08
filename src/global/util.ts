export const createArray = <T>(length: number): T[] => [...Array<T>(length) ];

export const logData = (message: string, data?: Record<string, any>) => 
  console.log(`${message} ${ data ? ` => ${JSON.stringify(data) }`: '' } \n\n`);