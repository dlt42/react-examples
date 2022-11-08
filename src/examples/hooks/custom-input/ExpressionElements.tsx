
/**
 * #REACT.MEMO
 */
import React, { useState } from "react";
import { ToArrayStrict } from "../../../global/types";
import { logData } from "../../../global/util";
import useInput, { ValueChangedCallback } from "./useInput";
import styles from  './ExpressionElements.module.css';

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

export interface OperatorProps {
  initial: OPERATORS, 
  valueChanged: ValueChangedCallback<OPERATORS>
}

export interface NumberProps {
  initial: number, 
  valueChanged: ValueChangedCallback<number>
}

type ExpressionElement = number | OPERATORS;

type UnparsedExperessionElement = number | string;

type ExperessionElementArray = ToArrayStrict<ExpressionElement>;

type ExperessionElement = number | OPERATORS;

export type ExpressionChangedCallback = (expression: string) => void;

export interface ExpressionElementsProps {
  initial: string,
  expressionChanged: ExpressionChangedCallback,
  name: string
}

export const OperatorElement: React.FC<OperatorProps> = ({ initial, valueChanged }): JSX.Element => {
  const [ selectProps ] = useInput(initial, valueChanged);
  return (
      <select {...selectProps}>
        { operations.map((operation: OPERATORS) => <option key={operation} value={operation}>{operation}</option>) }
      </select>
  )
}

export const NumberElement: React.FC<NumberProps> = ({ initial, valueChanged }): JSX.Element => {
  const [ inputProps ] = useInput(initial, valueChanged);
  return (
    <input type="number" {...inputProps} pattern="[0-9]+"/>
  )
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

const ExpressionElements: React.FC<ExpressionElementsProps> = ({ initial, expressionChanged, name }): JSX.Element => {
  const [ expression, setExpression ] = useState(parseExpression(initial));
  const logExpressions = (message: string, current: string): void => {
    logData(message, { initial, current });
  }
  const createCallback = (index: number): ValueChangedCallback<UnparsedExperessionElement> => {
    return (part: UnparsedExperessionElement): void => {
      const revisedExpression = [...expression];
      revisedExpression[index] = convertPart(part);
      setExpression(revisedExpression);
      const current = revisedExpression.join();
      expressionChanged(current);
      logExpressions(`Expression ${name} updated`, current);
    }
  }
  const current: string = expression.join();
  logExpressions(`Expression ${name} rendered`, current);
  return (
    <>
      <h4>{name}</h4>
      <form className={styles.expressionForm}>
      {
        expression.map((current: ExpressionElement, index: number) => typeof current === 'number'
            ? <NumberElement key={index} initial={current} valueChanged={ createCallback(index) }/>
            : <OperatorElement key={index} initial={current} valueChanged={ createCallback(index) }/>
        )
      }
      </form>
    </>
  )
}

// Wrap the ExpressionElements component in React.memo to prevent unnecessary re-renderin
export default React.memo(ExpressionElements);
