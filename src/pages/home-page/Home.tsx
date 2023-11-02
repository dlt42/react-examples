import { FC } from 'react';

import crazyPNG from '../../assets/crazy.png';
import Header from '../../components/Header/Header';
import Spinner from './spinner/Spinner';

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
