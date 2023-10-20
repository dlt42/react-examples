/**
 * #USE_EFFECT
 * #USE_REDUCER
 * 
 * A heavily contrived counter example that uses React hooks:
 * 
 *  Increase and decrease a number
 *  Reset the value
 *  Dynamically change the allowed range 
 */

import { useEffect, useReducer, useState } from "react";
import { logData } from "../../../global/util";
import styles from  './Counter.module.css';

enum ACTIONS {
  INC,
  DEC,
  SET
}

interface Range {
  min: number,
  max: number
}

interface Action {
  type?: ACTIONS,
  newValue?: number
}

const getRange = (): Range => {
  return {
    max: 20, min: 0 
  };
}

const performAction = (current: number, action: Action, range?: Range): number => { 
  let newValue: number = current || 0;
  switch(action.type) {
    case ACTIONS.INC:
      newValue += 1;
      break;
    case ACTIONS.DEC:
      newValue -= 1;
      break;
    case ACTIONS.SET:
      newValue = action.newValue || 0;
      break;
  }
  if (range) {
    const { min, max } = range;
    if (newValue < min) {
      newValue = min;
    }
    if (newValue > max) {
      newValue = max;
    }
  }
  return newValue;
}


const Counter: React.FC<{num: number | null}> = (props): JSX.Element => {
  const { num } = props;
  const [ range, setRange ] = useState<Range>();
  const [ value, dispatch ] = useReducer((current: number, action: Action) => { 
    logData(`Handle dispatch - Before`, { range, current });
    const newValue = performAction(current, action, range); 
    logData(`Handle dispatch - After`, { range, current, newValue });
    return newValue;
  }, num || 0);
  
  // Only called once
  useEffect(() => {
    logData(`Initial Render`);
    setRange(getRange());
  }, []);

  // Called when range is updated
  useEffect(() => {
    logData(`Range Updated`, { range });
    dispatch({})
  }, [range]);

  // Called whenever the component is refreshed
  useEffect(() => {
    document.title = `Counter: ${value}`;
    logData(`Refresh`, { value, range });
  });

  return (
    <div className="Content-Block-Outer">
      <div className="Content-Block">
        <div className={styles.counterControls}>
          <button onClick={() => dispatch({ type: ACTIONS.INC })}>
              Increment
          </button>
          <button onClick={() => dispatch({ type: ACTIONS.DEC })}>
              Decrement
          </button>
          <button onClick={() => dispatch({ type: ACTIONS.SET, newValue: num || 0 })}>
              Reset
          </button>
          <button onClick={() => setRange({ min: 0, max: 20 })}>
              Range 0 to 20 
          </button>
          <button onClick={() => setRange({ min: -10, max: 10 })}>
              Range -10 to 10 
          </button>
        </div>
        <p>Counter: {value}</p>
        <p>Range: {range ? `${range.min} to ${range.max}` : 'Not specified'}</p>
      </div>
    </div>
  );
}

export default Counter;