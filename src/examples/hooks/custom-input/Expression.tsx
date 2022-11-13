/**
 * #USE_CALLBACK
 */
import React, { useCallback, useReducer, useState } from "react";
import { logData } from "../../../global/util";
import ExpressionElements from "./ExpressionElements";
import { runFade } from "./tools";

const Expression: React.FC<{initial: string, flip: boolean}> = ({ initial, flip }): JSX.Element => {
  const [ expression, setExpression ] = useState(initial);
  const [ changeCount, dispatch ] = useReducer((val: number) => val + 1, 0);
 
  const expressionChanged = useCallback((exp: string): void => {
    setExpression(exp);
    logData(`Expression changed`);
    dispatch();
  }, []);

  logData(`Expression rendered`);
  runFade("ExpressionBlock");

  return (
    <>
      <div className="Content-Block-Outer">
        <div className="Content-Block">
          { `Expression prop is: ${flip}` }<br/>
          { `Change count: ${changeCount}`}
        </div>
      </div>
      <div id="ExpressionBlock" className="Content-Block-Outer fadeInit fadeBorder">
        <div className="Content-Block">
          <ExpressionElements initial={initial} expressionChanged={expressionChanged} id="Expression"/>
          <p>
            Expression: {expression}
          </p>
        </div>
      </div>
    </>
  )
}

export default Expression;