import { MouseEvent } from 'react';

export type RadialOption<T> = { value: T; label: string };

export type RadialSelectionTypes = string | number | Date;

type ChangeCallback<T> = (e: MouseEvent, value: T) => void;

export type SelectCallback = () => void;

export type OptionCallback = (e: MouseEvent, index: number) => void;

export type StepCallback = (step: number) => void;

export type RegisterCallback = (stepCallback: StepCallback) => void;

export type RadialSelectOptionState = {
  incAngle: number;
  incDistance: number;
  startAngle: number;
  adj: number;
  incDiameter: number;
};

export type RadialSelectProps<T> = {
  options: RadialOption<T>[];
  label: string;
  selectedLabel: string;
  selected: T | null;
  onChange: ChangeCallback<T>;
  diameter: number;
  itemDiameter: number;
  centerDiameter: number;
};

export type RadialSelectOptionProps = {
  label: string;
  index: number;
  startAngle: number;
  endAngle: number;
  diameter: number;
  onClickOption: OptionCallback;
  selected: boolean;
  registerCallback: RegisterCallback;
  itemDiameter: number;
  centerDiameter: number;
};
