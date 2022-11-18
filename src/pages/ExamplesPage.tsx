import React, { MouseEvent, useState, FunctionComponent } from "react";
import AppNav from "../components/Header";
import Expression from "../examples/hooks/custom-input/Expression";
import Counter from "../examples/hooks/useEffect/Counter";

const ExamplesPage: FunctionComponent = (): JSX.Element => {
  const [flip, setFlip] = useState(false);
  return (
    <>
      <header>
        <AppNav title='Home'/>
      </header>
      <main>
        <section>
          <h3>Example: Counter controls with useEffect, useState and useReducer</h3>
          <Counter num={-5}/>
        </section>
        <section>
          <h3>Example: Expression editor with useCallback, React.memo and custom hook useInput</h3>
          <button onClick={(e: MouseEvent) => setFlip((flip: boolean): boolean => !flip)}>Click to toggle Expression element prop</button>
          <Expression initial="1+2*-5" flip={flip}/>
        </section>
      </main>
    </>
  )
};

export default ExamplesPage;