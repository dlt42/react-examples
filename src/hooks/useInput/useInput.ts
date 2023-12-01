import { useCallback, useMemo, useState } from 'react';

import {
  InputProps,
  ResetValue,
  SetValue,
  Validator,
  ValueChangedCallback,
} from './useInput.types';

export const useInput = <T>(
  initialValue: T,
  valueChanged: ValueChangedCallback<T>,
  validator?: Validator<T>
): [InputProps<T>, ResetValue, SetValue<T>] => {
  const [value, setValue] = useState<T>(initialValue);
  const set = useCallback(
    (newValue: T): void => {
      const processedValue = validator ? validator(value, newValue) : newValue;
      setValue(processedValue);
      valueChanged(processedValue);
    },
    [validator, setValue, valueChanged, value]
  );
  const reset = useCallback(() => {
    return () => set(initialValue);
  }, [initialValue, set]);
  const props: InputProps<T> = useMemo(() => {
    return {
      value,
      onChange: (e) => set(e.target.value as unknown as T),
    };
  }, [value, set]);
  return [props, reset, set];
};

export default useInput;
