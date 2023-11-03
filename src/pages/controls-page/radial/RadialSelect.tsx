import {
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  OptionCallback,
  RadialOption,
  RadialSelectionTypes,
  RadialSelectOptionProps,
  RadialSelectProps,
  RegisterCallback,
  SelectCallback,
  StepCallback,
} from './RadialSelect.types';
import { setRefStyle } from './RadialSelect.util.';
import RadialSelectOption from './RadialSelectOption';

const RadialSelect = memo(
  <T extends RadialSelectionTypes>({
    options,
    label,
    selectedLabel,
    selected,
    onChange,
    diameter,
    centerDiameter,
    itemDiameter,
  }: RadialSelectProps<T>): JSX.Element => {
    const [value, setValue] = useState<T | null>(selected);
    const [state, setState] = useState<string>(`Closed`);
    const [step, setStep] = useState<number>(0);
    const [registered, setRegistered] = useState<StepCallback[]>([]);

    const ref = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setRegistered([]);
    }, [options]);
    useEffect(() => {
      registered.forEach((stepCallback: StepCallback) => stepCallback(step));
    }, [step, registered]);
    useEffect(() => {
      setRefStyle(ref, centerDiameter);
      setRefStyle(outerRef, diameter);
    }, [ref, centerDiameter, diameter]);
    useEffect(() => {
      if (state === `Closed` && step > 0) {
        setTimeout(() => setStep((step) => step - 1), 50);
      } else if (state === `Opened` && step < 10) {
        setTimeout(() => setStep((step) => step + 1), 50);
      }
    }, [step, state]);

    const onClickOption: OptionCallback = useCallback(
      (e: MouseEvent, index: number) => {
        const newValue = options[index].value;
        setValue(newValue);
        setState(`Closed`);
        onChange(e, newValue);
      },
      [onChange, options]
    );
    const onClickSelect: SelectCallback = useCallback(() => {
      setState((state) => (state === `Closed` ? `Opened` : `Closed`));
    }, []);
    const registerCallback: RegisterCallback = useCallback(
      (stepCallback: StepCallback) => {
        registered.push(stepCallback);
      },
      [registered]
    );

    return (
      <>
        <div
          ref={outerRef}
          className='relative flex items-center justify-center border border-solid border-gray-200 bg-gray-500'
        >
          {options.map((option: RadialOption<T>, index: number) => {
            const props: RadialSelectOptionProps = {
              label: option.label,
              onClickOption: onClickOption,
              startAngle: (360 / options.length) * index - 135,
              endAngle: (360 / options.length) * (index + 1) - 135,
              selected: value === option.value,
              diameter,
              index,
              registerCallback,
              itemDiameter,
              centerDiameter,
            };
            return <RadialSelectOption key={`${label}${index}]`} {...props} />;
          })}
          <div
            ref={ref}
            className='z-20 flex cursor-pointer flex-col items-center justify-center border border-solid border-gray-800 bg-gray-200 text-[10px] text-gray-800 hover:bg-gray-800 hover:text-gray-200'
            onClick={() => onClickSelect()}
          >
            <div>{(value && selectedLabel) || label}</div>
            {value && (
              <div className='underline'>
                {options.filter((o) => value === o.value)[0].label}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default RadialSelect;
