import { FC } from 'react';

import Header from '../components/Header';
import JSONViewer from '../examples/json-viewer/JSONViewer';

const JSONViewerPage: FC = (): JSX.Element => (
  <>
    <header>
      <Header title='JSON Viewer' />
    </header>
    <main>
      <section>
        <JSONViewer />
      </section>
    </main>
  </>
);

export default JSONViewerPage;
