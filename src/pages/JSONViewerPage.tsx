import { FC } from 'react';

import Header from '../components/Header/Header';
import JSONViewer from '../content/json-viewer/JSONViewer';

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
