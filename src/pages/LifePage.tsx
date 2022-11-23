import { FunctionComponent } from "react";
import AppNav from "../components/Header";
import LifeContainer from "../examples/life/LifeContainer";

const LifePage: FunctionComponent = (): JSX.Element => (
    <>
      <header>
        <AppNav title='Game of Life'/>
      </header>
      <main>
        <section>
          <LifeContainer height={100} width={100}/>
        </section>
      </main>
    </>
)

export default LifePage;