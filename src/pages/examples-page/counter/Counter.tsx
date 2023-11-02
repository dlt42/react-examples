/**
 * A heavily contrived counter example that uses React hooks to:
 *
 *  Increase and decrease a number
 *  Reset the value
 *  Dynamically change the allowed range
 */

import { FC, useEffect, useReducer, useState } from 'react';

import Button from '../../../components/Button/Button';
import Container from '../../../components/Container/Container';
import { logData } from '../../../global/util';

enum ACTIONS {
  INC,
  DEC,
  SET,
}

type Range = {
  min: number;
  max: number;
};

type Action = {
  type?: ACTIONS;
  newCounterValue?: number;
  range?: Range;
};

const getInitialRange = (): Range => {
  return {
    max: 20,
    min: 0,
  };
};

const performCounterValueAction = (
  currentCounterValue: number,
  action: Action
): number => {
  let newCounterValue = currentCounterValue || 0;
  const { type, range } = action;
  switch (type) {
    case ACTIONS.INC:
      newCounterValue += 1;
      break;
    case ACTIONS.DEC:
      newCounterValue -= 1;
      break;
    case ACTIONS.SET:
      newCounterValue = action.newCounterValue || 0;
      break;
  }
  if (range) {
    const { min, max } = range;
    if (newCounterValue < min) {
      newCounterValue = min;
    }
    if (newCounterValue > max) {
      newCounterValue = max;
    }
  }
  return newCounterValue;
};

type CounterProps = { initialCounterValue: number | null };

const counterValueReducer = (counterValue: number, action: Action) => {
  logData(
    `Handle counter action - Before`,
    { action, counterValue },
    `counterValueReducer`
  );
  const newCounterValue = performCounterValueAction(counterValue, action);
  logData(
    `Handle dispatch - After`,
    { action, counterValue, newCounterValue },
    `counterValueReducer`
  );
  return newCounterValue;
};

const Counter: FC<CounterProps> = (props): JSX.Element => {
  const { initialCounterValue } = props;
  const [range, setRange] = useState<Range>();
  const [counterValue, counterValueDispatch] = useReducer(
    counterValueReducer,
    initialCounterValue || 0
  );

  // Only called once
  useEffect(() => {
    const initialRange = getInitialRange();
    logData(
      `Counter initialisation`,
      { initialRange },
      `Counter -> useEffect []`
    );
    setRange(initialRange);
  }, []);

  // Called when range is updated
  useEffect(() => {
    logData(`Counter range updated`, { range }, `Counter -> useEffect [range]`);
    counterValueDispatch({ range });
  }, [range]);

  // Called whenever the component is refreshed
  useEffect(() => {
    document.title = `Counter: ${counterValue}`;
    logData(`Counter refresh`, { counterValue, range }, `Counter -> useEffect`);
  });

  return (
    <Container border={false} padding={false}>
      <div className='flex flex-row flex-wrap justify-center gap-1 text-center'>
        <Button
          onClick={() => counterValueDispatch({ type: ACTIONS.INC, range })}
        >
          Increment
        </Button>
        <Button
          onClick={() => counterValueDispatch({ type: ACTIONS.DEC, range })}
        >
          Decrement
        </Button>
        <Button
          onClick={() =>
            counterValueDispatch({
              type: ACTIONS.SET,
              newCounterValue: initialCounterValue || 0,
              range,
            })
          }
        >
          Reset
        </Button>
        <Button onClick={() => setRange({ min: 0, max: 20 })}>
          Range 0 to 20
        </Button>
        <Button onClick={() => setRange({ min: -10, max: 10 })}>
          Range -10 to 10
        </Button>
      </div>
      <p>Counter: {counterValue}</p>
      <p>Range: {range ? `${range.min} to ${range.max}` : `Not specified`}</p>
    </Container>
  );
};

export default Counter;
