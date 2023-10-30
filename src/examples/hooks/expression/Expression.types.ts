import { Dispatch } from 'react';

import { ToArrayStrict } from '../../../global/types';

export enum OPERATORS {
  ADD = `+`,
  SUBTRACT = `-`,
  MULTIPLY = `*`,
  DIVIDE = `/`,
}

export const operations: OPERATORS[] = [
  OPERATORS.ADD,
  OPERATORS.SUBTRACT,
  OPERATORS.MULTIPLY,
  OPERATORS.DIVIDE,
];

export type UnparsedExpressionElement = number | string;

export type ExpressionElementArray = ToArrayStrict<ExpressionElement>;

export type ExpressionElement = number | OPERATORS;

export type ElementChangedCallback<T> = (value: T, index: number) => void;

export type ExpressionChangedCallback = (expression: string) => void;

export type OperatorProps = {
  value: OPERATORS;
  expressionElementsDispatch: Dispatch<ExpressionElementsAction>;
  index: number;
  id: string;
};

export type NumberProps = {
  value: number;
  expressionElementsDispatch: Dispatch<ExpressionElementsAction>;
  index: number;
  id: string;
};

export type ExpressionElementsProps = {
  initial: string;
  expressionChanged: ExpressionChangedCallback;
  id: string;
};

export type ExpressionElementsAction = {
  element: UnparsedExpressionElement;
  index: number;
  type: 'update_expression_element';
};

export type ExpressionElementsReducer = (
  expression: ExpressionElementArray,
  action: ExpressionElementsAction
) => ExpressionElementArray;

export type ExpressionProps = { initial: string; toggle: boolean };

export type ChangeCountReducer = (changeCount: number) => number;
