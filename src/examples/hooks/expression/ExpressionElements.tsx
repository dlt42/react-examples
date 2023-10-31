import { FC, memo, useEffect, useReducer } from 'react';

import Container from '../../../components/Container';
import { logData } from '../../../global/util';
import {
  ExpressionElement,
  ExpressionElementsProps,
  ExpressionElementsReducer,
} from './Expression.types';
import { NumberElement } from './NumberElement';
import { OperatorElement } from './OperatorElement';
import { convertPart, parseExpression, runFade } from './utils';

const expressionElementsReducer: ExpressionElementsReducer = (
  expression,
  action
) => {
  if (action.type === 'update_expression_element') {
    const newExpression = [...expression];
    newExpression[action.index] = convertPart(action.element);
    logData(
      `Expression elements updated`,
      {
        newExpression,
      },
      'expressionElementsReducer'
    );
    return newExpression;
  }
  throw Error('Unknown action');
};

const ExpressionElements: FC<ExpressionElementsProps> = memo(
  ({ initial, expressionChanged, id }): JSX.Element => {
    const [expressionElements, expressionElementsDispatchh] = useReducer(
      expressionElementsReducer,
      parseExpression(initial)
    );

    useEffect(() => {
      const newExpression = expressionElements.join(``);
      if (newExpression !== initial) {
        expressionChanged(newExpression);
        logData(
          `Expression changed`,
          {
            initial,
            newExpression,
          },
          `ExpressionElements -> useEffect`
        );
      }
    }, [initial, expressionElements, expressionChanged]);

    logData(
      `Expression elements rendered`,
      { expressionElements },
      `ExpressionElements`
    );

    runFade(id);
    return (
      <Container border={false} padding={false}>
        <div className='pt-2 text-left align-bottom text-[8px] font-bold'>
          ExpressionElements
        </div>
        <Container id={id} classes='fadeInitBlack fadeBorderRed'>
          <form className='flex flex-wrap justify-center gap-1'>
            {expressionElements.map(
              (current: ExpressionElement, index: number) =>
                typeof current === `number` ? (
                  <NumberElement
                    key={index}
                    value={current}
                    index={index}
                    id={id + index}
                    expressionElementsDispatch={expressionElementsDispatchh}
                  />
                ) : (
                  <OperatorElement
                    key={index}
                    value={current}
                    index={index}
                    id={id + index}
                    expressionElementsDispatch={expressionElementsDispatchh}
                  />
                )
            )}
            {typeof expressionElements[expressionElements.length - 1] ===
            `number` ? (
              <div
                id={`${id}-outer`}
                className=' flex min-w-[46px] justify-center overflow-hidden'
              />
            ) : null}
          </form>
        </Container>
      </Container>
    );
  }
);

// Wrap the ExpressionElements component in React.memo to prevent unnecessary re-renderin
export default ExpressionElements;
