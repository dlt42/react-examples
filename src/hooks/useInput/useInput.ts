import { useState } from 'react';

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
  const set = (newValue: T): void => {
    const processedValue = validator ? validator(value, newValue) : newValue;
    setValue(processedValue);
    valueChanged(processedValue);
  };
  const reset = () => set(initialValue);
  const props: InputProps<T> = {
    value,

    onChange: (e) => set(e.target.value as unknown as T),
  };
  return [props, reset, set];
};

export default useInput;
