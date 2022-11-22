import { FunctionComponent } from "react";
import AppNav from "../components/Header";
import Life from "../examples/life/Life";

const LifePage: FunctionComponent = (): JSX.Element => (
    <>
      <header>
        <AppNav title='Game of Life'/>
      </header>
      <main>
        <section>
          <Life height={100} width={100}/>
        </section>
      </main>
    </>
)

export default LifePage;