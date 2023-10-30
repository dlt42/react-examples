import {
  FC,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  degreesToRadians,
  RadialSelectOptionProps,
  RadialSelectOptionState,
  setRefStyle,
  StepCallback,
} from './RadialSelectSupport';

const StepTotal = 10;

const RadialSelectOption: FC<RadialSelectOptionProps> = memo(
  ({
    label,
    onClickOption,
    startAngle,
    endAngle,
    diameter,
    index,
    registerCallback,
    itemDiameter,
    centerDiameter,
  }): JSX.Element => {
    const [optionState, setOptionState] =
      useState<RadialSelectOptionState | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const stepCallback: StepCallback = useCallback(
      (step: number) => {
        if (!optionState) return;
        const angle = optionState.startAngle + step * optionState.incAngle;
        const distance = step * optionState.incDistance;
        const optionDiameter = step * optionState.incDiameter;
        const adj = optionState.adj - optionDiameter / 2 - 1;
        if (ref.current) {
          ref.current.style.top =
            Math.sin(degreesToRadians(angle)) * distance + adj + `px`;
          ref.current.style.left =
            Math.cos(degreesToRadians(angle)) * distance + adj + `px`;
          ref.current.style.fontSize = step * 1 + `px`;
          setRefStyle(ref, optionDiameter);
        }
      },
      [ref, optionState]
    );

    useEffect(() => {
      registerCallback(stepCallback);
    }, [stepCallback, registerCallback]);
    useEffect(() => {
      const diff = (diameter - centerDiameter - itemDiameter * 2) / 4 - 1;
      const maxDistance = diameter / 2 - itemDiameter / 2 - diff;
      setOptionState({
        incAngle: (endAngle - startAngle) / StepTotal,
        incDistance: maxDistance / StepTotal,
        incDiameter: itemDiameter / StepTotal,
        startAngle,
        adj: diameter / 2,
      });
    }, [endAngle, startAngle, diameter, itemDiameter, centerDiameter]);

    return (
      <div
        ref={ref}
        className='Radial-Option'
        onClick={(e: MouseEvent) => onClickOption(e, index)}
      >
        {label}
      </div>
    );
  }
);

export default RadialSelectOption;
