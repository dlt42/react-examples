import axios from 'axios';
import { Result } from 'true-myth';
import { ZodError, ZodType, ZodTypeDef } from 'zod';

import { getErrorMessage } from './util';

export type DataLoaderErrorName = 'InvalidResponse';

const convertZodError = (error: ZodError) =>
  error.issues.map(
    (i) => `${i.path.length ? `${i.path.join('.')} -> ` : ''}${i.message}`
  );

type Schema<T> = ZodType<T, ZodTypeDef, T>;

type ResponseValidationResult<T> = Result<T, string[]>;

const validateResponse = <T>(
  schema: Schema<T>,
  value: unknown
): ResponseValidationResult<T> => {
  const parseResult = schema.safeParse(value);
  return parseResult.success
    ? Result.ok(parseResult.data)
    : Result.err(convertZodError(parseResult.error));
};

//TODO: Use error type with { type: 'thrown' | 'validation' }
export const loadData = async <T>(
  schema: Schema<T>,
  url: string
): Promise<ResponseValidationResult<T>> => {
  try {
    const res: T = await axios.get(url);
    return validateResponse(schema, res);
  } catch (e) {
    return Result.err([getErrorMessage(e)]);
  }
};
