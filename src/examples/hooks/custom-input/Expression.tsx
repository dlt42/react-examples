/**
 * #USE_CALLBACK
 */
import React, { useCallback, useState } from "react";
import ExpressionElements from "./ExpressionElements";

const Expression: React.FC<{initial: string}> = ({ initial }): JSX.Element => {
  const [ expressionOne, setExpressionOne ] = useState(initial);
  const [ expressionTwo, setExpressionTwo ] = useState(initial);
  /*
  Using these callbacks only the related ExpressionElements component would be rendered
  when either expressionOne or expressionTwo is updated
  */
  const expressionOneChanged = useCallback((expression: string): void => {
    setExpressionOne(expression);
  }, []);
  const expressionTwoChanged = useCallback((expression: string): void => {
    setExpressionTwo(expression);
  }, []);

  /*
  Using these callbacks both ExpressionElements components would be rendered
  when either expressionOne or expressionTwo is updated
  */
  /*
  const expressionOneChangedAlt = (expression: string): void => {
    setExpressionOne(expression);
  };
  const expressionTwoChangedAlt = (expression: string): void => {
    setExpressionTwo(expression);
  };
  */
  return (
    <>
      <div className="contentBlockOuter">
        <div className="contentBlock">
          <ExpressionElements initial={initial} expressionChanged={expressionOneChanged} name="One"/>
          <p>
            Expression One: {expressionOne}
          </p>
        </div>
      </div>
      <div className="contentBlockOuter">
        <div className="contentBlock">
          <ExpressionElements initial={initial} expressionChanged={expressionTwoChanged} name="Two"/>
          <p>
            Expression Two: {expressionTwo}
          </p>
        </div>
      </div>
    </>
  )
}

export default Expression;