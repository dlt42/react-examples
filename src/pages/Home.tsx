import { FC } from 'react';

import Header from '../components/Header';
import Spinner from '../examples/spinner/Spinner';
import crazyPNG from './crazy.png';

const HomePage: FC = (): JSX.Element => (
  <>
    <header>
      <Header title='Home' />
    </header>
    <main>
      <section>
        <Spinner img={crazyPNG} angleIncrement={2} intervalDuration={50} />
      </section>
    </main>
  </>
);

export default HomePage;
