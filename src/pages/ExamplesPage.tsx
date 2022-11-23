import { MouseEvent, useState, FunctionComponent } from "react";
import AppNav from "../components/Header";
import Expression from "../examples/hooks/custom-input/Expression";
import Counter from "../examples/hooks/useEffect/Counter";
import CanvasWrapper, { DrawFunction } from "../components/CanvasWrapper";
import "./ExamplesPage.css";

const ExamplesPage: FunctionComponent = (): JSX.Element => {
  const [flip, setFlip] = useState(false);

  const draw: DrawFunction = (context, _, frameCount) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = '#000000'
    context.beginPath()
    context.arc(context.canvas.width / 2, context.canvas.height / 2, 20*Math.sin(frameCount.value*0.05)**2, 0, 2*Math.PI)
    context.fill()
  }
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
        <section>
          <h3>Example: Simple animation using a wrapped canvas component</h3>
          <div className="Example-Canvas">
            <CanvasWrapper draw={draw} canvasAttrs={{width: 200, height: 200 }}/>
          </div>
        </section>
      </main>
    </>
  )
};

export default ExamplesPage;