import { FC, useCallback, useReducer, useState } from 'react';

import Container from '../../../components/Container';
import { logData } from '../../../global/util';
import { ChangeCountReducer, ExpressionProps } from './Expression.types';
import ExpressionElements from './ExpressionElements';
import { runFade } from './utils';

const changeCountReducer: ChangeCountReducer = (changeCount) => changeCount + 1;

const Expression: FC<ExpressionProps> = ({ initial, toggle }): JSX.Element => {
  const [expression, setExpression] = useState(initial);
  const [changeCount, changeCountDispatch] = useReducer(changeCountReducer, 0);

  const expressionChanged = useCallback((newExpression: string): void => {
    setExpression(newExpression);
    logData(
      `Expression changed`,
      { newExpression },
      'Expression -> expressionChanged'
    );
    changeCountDispatch();
  }, []);

  logData(`Expression rendered`, { expression, initial }, `Expression`);
  runFade(`ExpressionContentBlock`);

  return (
    <Container border={false} padding={false}>
      <Container border={false} padding={false}>
        <div>{`Toggle prop is: ${toggle}`}</div>
        <div>{`Change count: ${changeCount}`}</div>
      </Container>

      <Container border={false} padding={false}>
        <div className='pt-2 text-left align-bottom text-[8px] font-bold'>
          Expression
        </div>
        <Container
          id='ExpressionContentBlock'
          classes='fadeBorderRed fadeInitBlack'
        >
          <ExpressionElements
            initial={initial}
            expressionChanged={expressionChanged}
            id='Expression'
          />
          <p>Expression: {expression}</p>
        </Container>
      </Container>
    </Container>
  );
};

export default Expression;
