import * as React from "react";
import AppNav from "../components/Header";

const HomePage: React.FunctionComponent = (): JSX.Element => (
  <>
    <header>
      <AppNav title='Home'/>
    </header>
    <main>
      <section>
        <h3>React Examples</h3>
      </section>
    </main>
  </>
);

export default HomePage;