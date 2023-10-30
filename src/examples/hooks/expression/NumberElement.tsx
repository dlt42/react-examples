import { FC, memo, useCallback } from 'react';

import Container from '../../../components/Container';
import { logData } from '../../../global/util';
import { ExpressionElementsAction, NumberProps } from './Expression.types';
import useInput from './useInput';
import { runFadeField } from './utils';

export const NumberElement: FC<NumberProps> = memo(
  ({ value, expressionElementsDispatch, index, id }): JSX.Element => {
    const [inputProps] = useInput(
      value,
      useCallback(
        (newvalue: number) => {
          const expressionElementsDispatchPayload: ExpressionElementsAction = {
            element: newvalue,
            index,
            type: 'update_expression_element',
          };
          expressionElementsDispatch(expressionElementsDispatchPayload);
          logData(
            `Dispatching expression number element change`,
            {
              expressionElementsDispatchPayload,
            },
            `NumberElement -> inputProps callback`
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
      `NumberElement`
    );
    runFadeField(id);

    return (
      <Container border={false} padding={false}>
        <div className='pt-2 text-left align-bottom text-[8px] font-bold'>
          Number
        </div>
        <Container border={false} padding={false}>
          <div className='flex min-w-[46px] justify-center overflow-hidden'>
            <input
              id={id}
              className='expressionField fieldFadeInitBlack fieldFadeBorderRed min-w-[40px] max-w-full border-2 border-solid border-gray-800 p-1'
              type='number'
              {...inputProps}
              pattern='[0-9]+'
            />
          </div>
        </Container>
      </Container>
    );
  }
);
