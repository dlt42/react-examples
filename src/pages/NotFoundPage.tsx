import * as React from "react";
import AppNav from "../components/Header";

const NotFoundPage: React.FunctionComponent = (): JSX.Element => (
  <>
    <header>
      <AppNav title='Not Found'/>
    </header>
    <main>
      <section>
        <h3>404: Page Not Found!</h3>
      </section>
    </main>
  </>
)

export default NotFoundPage;