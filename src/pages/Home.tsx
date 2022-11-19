import { FunctionComponent } from "react";
import AppNav from "../components/Header";
import Spinner from "../examples/spinner/Spinner";
import crazyPNG from "./crazy.png";

const HomePage: FunctionComponent = (): JSX.Element => (
  <>
    <header>
      <AppNav title='Home'/>
    </header>
    <main>
      <section>
        <h3>React Examples</h3>
        <Spinner img={crazyPNG} angleIncrement={2} intervalDuration={50} />
      </section>
    </main>
  </>
);

export default HomePage;