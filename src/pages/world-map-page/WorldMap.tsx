import { FC, useEffect, useState } from 'react';

import Header from '../../components/Header/Header';
import { loadData } from '../../global/DataLoader';
import { useAppSelector } from '../../hooks/useAppDispatch/useAppDispatch';
import { selectCountries, setCountries } from '../../state/appSlice';
import { AppDispatch } from '../../state/store';
import { Countries, countriesDtoSchema } from './country/Country.types';
import CountryStats from './country/CountryStats';

export const loadCountries = async (appDispatch: AppDispatch) => {
  try {
    const loadDataResponse = await loadData(
      countriesDtoSchema,
      `https://restcountries.com/v2/all?fields=name,capital,region,subregion,population,alpha3Code,flag,altSpellings`
    );
    if (loadDataResponse.isOk) {
      const {
        value: { data },
      } = loadDataResponse;
      data.forEach((current) => {
        current.key = `${current.name}-${current.alpha3Code}`;
        current.shortName = current.name;
        if (current.altSpellings) {
          current.altSpellings
            .sort((a, b) => b.length - a.length)
            .forEach((spelling: string) => {
              if (
                current.shortName &&
                current.shortName.length > 20 &&
                current.shortName.length < spelling.length &&
                spelling.length > 3
              ) {
                current.shortName = spelling;
              }
            });
        }
        if (current.shortName.length > 20) {
          current.shortName = current.shortName.substring(0, 16) + `...`;
        }
      });
      appDispatch(setCountries(data));
      return true;
    }
  } catch (e) {
    //
  }
  setCountries([]);
  return false;
};

const WorldMapPage: FC = (): JSX.Element => {
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

export default WorldMapPage;
