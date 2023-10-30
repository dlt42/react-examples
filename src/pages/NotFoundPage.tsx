import { FC } from 'react';

import Header from '../components/Header';

const NotFoundPage: FC = (): JSX.Element => (
  <>
    <header>
      <Header title='Not Found' />
    </header>
    <main>
      <section>
        <h3>404: Page Not Found!</h3>
      </section>
    </main>
  </>
);

export default NotFoundPage;
