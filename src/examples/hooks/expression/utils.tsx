import {
  ExpressionElement,
  ExpressionElementArray,
  OPERATORS,
  UnparsedExpressionElement,
} from './Expression.types';

const expressionRegEx: RegExp = /([*/]|\b\s*-|\b\s*\+)/g;

export const convertPart = (
  part: UnparsedExpressionElement
): ExpressionElement => {
  if (typeof part === `number`) {
    return part;
  }
  return isNaN(+part) ? (part as OPERATORS) : parseInt(part);
};

export const parseExpression = (
  rawExpression: string
): ExpressionElementArray => {
  return rawExpression.split(expressionRegEx).map(convertPart);
};

export const runFade = (id: string) => {
  document.getElementById(id)?.classList.add(`fadeBorderRed`);
  setTimeout(
    () => document.getElementById(id)?.classList.remove(`fadeBorderRed`),
    1000
  );
};

export const runFadeField = (id: string) => {
  document.getElementById(id)?.classList.add(`fieldFadeBorderRed`);
  setTimeout(
    () => document.getElementById(id)?.classList.remove(`fieldFadeBorderRed`),
    1000
  );
};
