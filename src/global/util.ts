export const createArray = <T>(length: number): T[] => [...Array<T>(length)];

export const logData = (
  message: string,
  data?: Record<string, unknown>,
  location?: string
) =>
  console.log(
    `${location ? `${location} ` : ``}\n\n
    ${message}${data ? ` => ${JSON.stringify(data)}` : ``}\n\n`
  );
