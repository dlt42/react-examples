import { FC, memo, useCallback } from 'react';

import Container from '../../../components/Container';
import { logData } from '../../../global/util';
import {
  ExpressionElementsAction,
  operations,
  OperatorProps,
  OPERATORS,
} from './Expression.types';
import useInput from './useInput';
import { runFadeField } from './utils';

export const OperatorElement: FC<OperatorProps> = memo(
  ({ value, expressionElementsDispatch, index, id }): JSX.Element => {
    const [selectProps] = useInput(
      value,
      useCallback(
        (newvalue: OPERATORS) => {
          const expressionElementsDispatchPayload: ExpressionElementsAction = {
            element: newvalue,
            index,
            type: 'update_expression_element',
          };
          expressionElementsDispatch(expressionElementsDispatchPayload);
          logData(
            `Dispatching expression operator element change`,
            {
              expressionElementsDispatchPayload,
            },
            `OperatorElement -> selectProps callback`
          );
        },
        [index, expressionElementsDispatch]
      )
    );

    logData(
      `Expression element rendered`,
      {
        index,
        value,
        id,
      },
      `OperatorElement`
    );
    runFadeField(id);

    return (
      <Container border={false} padding={false}>
        <div className='pt-2 text-left align-bottom text-[8px] font-bold'>
          Operator
        </div>
        <Container border={false} padding={false}>
          <div className='flex min-w-[46px] justify-center overflow-hidden'>
            <select
              id={id}
              {...selectProps}
              className='expressionField fieldFadeInitBlack fieldFadeBorderRed min-w-[40px] max-w-full border-2 border-solid border-gray-800 p-1'
            >
              {operations.map((operation: OPERATORS) => (
                <option key={operation} value={operation}>
                  {operation}
                </option>
              ))}
            </select>
          </div>
        </Container>
      </Container>
    );
  }
);
