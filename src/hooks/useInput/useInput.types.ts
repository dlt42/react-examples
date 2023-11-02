import { ChangeEventHandler } from 'react';

export type ResetValue = () => void;

export type SetValue<T> = (newValue: T) => void;

export type Validator<T> = (prevValue: T, nextValue: T) => T;

export type ValueChangedCallback<T> = (value: T) => void;

export type InputProps<T> = {
  value: T;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
};
