
/**
 * #REACT.MEMO
 */
import React, { useCallback, useState } from "react";
import { ToArrayStrict } from "../../../global/types";
import { logData } from "../../../global/util";
import useInput from "./useInput";
import './ExpressionElements.css';
import { runFade } from "./tools";

export enum OPERATORS {
  ADD = "+",
  SUBTRACT = "-",
  MULTIPLY = "*",
  DIVIDE = "/"
}

const operations: OPERATORS[] =  [
  OPERATORS.ADD,
  OPERATORS.SUBTRACT,
  OPERATORS.MULTIPLY,
  OPERATORS.DIVIDE
];

type ExpressionElement = number | OPERATORS;

type UnparsedExperessionElement = number | string;

type ExperessionElementArray = ToArrayStrict<ExpressionElement>;

type ExperessionElement = number | OPERATORS;

export type ElementChangedCallback<T> = (value: T, index: number) => void;

export type ExpressionChangedCallback = (expression: string) => void;

export interface OperatorProps {
  initial: OPERATORS, 
  valueChanged: ElementChangedCallback<OPERATORS>,
  index: number,
  id: string
}

export interface NumberProps {
  initial: number, 
  valueChanged: ElementChangedCallback<number>,
  index: number,
  id: string
}

export interface ExpressionElementsProps {
  initial: string,
  expressionChanged: ExpressionChangedCallback,
  id: string
}

const expressionRegEx: RegExp = /([*/]|\b\s*-|\b\s*\+)/g;

const convertPart = (part: UnparsedExperessionElement): ExperessionElement => {
  if (typeof part === 'number') {
    return part;
  }
  return isNaN(+part) ? part as OPERATORS : parseInt(part);
}

const parseExpression = (rawExpression: string): ExperessionElementArray => {
  return rawExpression.split(expressionRegEx).map(convertPart);
}

export const OperatorElement: React.FC<OperatorProps> = React.memo(({ initial, valueChanged, index, id }): JSX.Element => {
  const [ selectProps ] = useInput(initial, useCallback((value: OPERATORS) => valueChanged(value, index), [index, valueChanged]));
  
  logData(`Expression element ${index} rendered`);
  runFade(id);
  
  return (
    <div id={id} className="fadeInit fadeBorder">
      <select {...selectProps}>
        { operations.map((operation: OPERATORS) => <option key={operation} value={operation}>{operation}</option>) }
      </select>
    </div>
  )
})

export const NumberElement: React.FC<NumberProps> = React.memo(({ initial, valueChanged, index, id }): JSX.Element => {
  const [ inputProps ] = useInput(initial,  useCallback((value: number) => valueChanged(value, index), [index, valueChanged]));
  
  logData(`Expression element ${index + 1} rendered`);
  runFade(id);
  
  return (
    <div id={id} className="fadeInit fadeBorder">
      <input type="number" {...inputProps} pattern="[0-9]+"/>
    </div>
  )
})

const ExpressionElements: React.FC<ExpressionElementsProps> = React.memo(({ initial, expressionChanged, id }): JSX.Element => {
  const [ expression ] = useState(parseExpression(initial));
  const elementCallback = useCallback((part: UnparsedExperessionElement, index: number) => {
    expression[index] = convertPart(part);
    logData(`Expression elements updated`, { initial, current: expression.join("") });
    expressionChanged(expression.join(""));
  }, [initial, expressionChanged, expression]);

  logData(`Expression elements rendered`, { initial,  current: expression.join("") });
  runFade(id);

  return (
    <>
      <form id={id} className="expressionForm fadeInitBlack fadeBorder">
      {
        expression.map((current: ExpressionElement, index: number) => typeof current === 'number'
            ? <NumberElement 
                key={index} 
                initial={current} 
                index={index}
                id={id + index}
                valueChanged={elementCallback}
                />
            : <OperatorElement 
                key={index} 
                initial={current} 
                index={index}
                id={id + index}
                valueChanged={elementCallback}/>
        )
      }
      </form>
    </>
  )
})

// Wrap the ExpressionElements component in React.memo to prevent unnecessary re-renderin
export default ExpressionElements;
