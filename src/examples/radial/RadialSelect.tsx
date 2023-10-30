import './RadialSelect.css';

import {
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import RadialSelectOption from './RadialSelectOption';
import {
  OptionCallback,
  RadialOption,
  RadialSelectionTypes,
  RadialSelectOptionProps,
  RadialSelectProps,
  RegisterCallback,
  SelectCallback,
  setRefStyle,
  StepCallback,
} from './RadialSelectSupport';

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
        <div ref={outerRef} className='Radial-Input'>
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
            className='Radial-Center'
            onClick={() => onClickSelect()}
          >
            <div>{(value && selectedLabel) || label}</div>
            {value && (
              <div className='Radial-Selected'>
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
