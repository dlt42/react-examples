import { FC, useEffect, useState } from 'react';

import Header from '../components/Header/Header';
import CountryStats from '../content/stats/CountryStats';
import { useAppSelector } from '../hooks/useAppDispatch/useAppDispatch';
import { Countries, selectCountries } from '../state/appSlice';

const StatsPage: FC = (): JSX.Element => {
  const [status, setStatus] = useState(`Loading`);
  const countries: Countries = useAppSelector(selectCountries);
  useEffect(() => {
    if (countries) {
      setStatus(`Loaded`);
    } else {
      setStatus(`No Data`);
    }
  }, [countries]);
  return (
    <>
      <header>
        <Header title='World Map' />
      </header>
      <main>
        <section className='flex min-h-0 flex-grow flex-row p-1'>
          {status === `Loaded` ? (
            <CountryStats />
          ) : (
            <h4 className='w-full '>{status}</h4>
          )}
        </section>
      </main>
    </>
  );
};

export default StatsPage;
