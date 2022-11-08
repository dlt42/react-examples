import { ChangeEventHandler, useState } from "react";

export type ResetValue = () => void;

export type SetValue<T> = (newValue: T) => void;

export type Validator<T> = (prevValue: T, nextValue: T) => T;

export type ValueChangedCallback<T> = (value: T) => void;

export interface InputProps<T> {
  value: T,
  onChange: ChangeEventHandler<any>
}

export function useInput<T>(
  initialValue: T,
  valueChanged: ValueChangedCallback<T>,
  validator?: Validator<T>
): [InputProps<T>, ResetValue, SetValue<T> ] {
  const [value, setValue] = useState<T>(initialValue);
  const set = (newValue: T): void => {
    const processedValue = validator ? validator(value, newValue) : newValue;
    setValue(processedValue);
    valueChanged(processedValue);
  };
  const reset = () => set(initialValue);
  const props: InputProps<T> = {
      value,
      onChange: e => set(e.target.value)
  };
  return [props, reset, set];
} 

export default useInput;