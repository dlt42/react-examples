import * as React from "react";
import AppNav from "../components/Header";
import JSONViewer from "../examples/json-viewer/JSONViewer";

const JSONViewerPage: React.FunctionComponent = (): JSX.Element => (
  <>
    <header>
      <AppNav title='JSON Viewer'/>
    </header>
    <main>
      <section>
        <JSONViewer />
      </section>
    </main>
  </>
);

export default JSONViewerPage;