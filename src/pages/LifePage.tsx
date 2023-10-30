import { FC } from 'react';

import Header from '../components/Header';
import LifeContainer from '../examples/life/LifeContainer';

const LifePage: FC = (): JSX.Element => (
  <>
    <header>
      <Header title='Game of Life' />
    </header>
    <main>
      <section>
        <LifeContainer height={100} width={100} />
      </section>
    </main>
  </>
);

export default LifePage;
