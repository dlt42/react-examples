import './ChartPage.css';

import { FC, useEffect, useState } from 'react';

import Button from '../components/Button.js';
import Header from '../components/Header';
import { ZoomableSunburstChart2 } from '../examples/d3/ZoomableSunburstChart2.jsx';
import { Countries, Country, selectCountries } from '../state/appSlice';
import { useAppSelector } from '../state/useAppDispatch.js';
import { ZoomableSunburstChart1 } from './../examples/d3/ZoomableSunburstChart1.jsx';

type ChartData = {
  name: string;
  children?: ChartData[];
  value?: number;
  shortName?: string;
  total: number;
};

const blankData: ChartData = {
  name: `World`,
  children: [],
  total: 0,
};

const prepareChartData = (countries: Countries): ChartData => {
  const data: ChartData = {
    name: `World`,
    children: [],
    total: 0,
  };
  const regions: Record<string, ChartData> = {};
  const subRegions: Record<string, ChartData> = {};
  const added: Record<string, ChartData> = {};
  countries.items.forEach((current: Country) => {
    if (added[current.name]) {
      return;
    }
    const { region, subregion, population, name, shortName } = current;
    let regionObj = regions[region];
    if (!regionObj) {
      regionObj = regions[region] = { name: region, children: [], total: 0 };
      data.children?.push(regionObj);
    }
    let subRegionObj = subRegions[subregion];
    if (!subRegionObj) {
      subRegionObj = subRegions[subregion] = {
        name: subregion,
        children: [],
        total: 0,
      };
      regionObj.children?.push(subRegionObj);
    }
    subRegionObj.children?.push({
      name: name,
      value: population,
      shortName: shortName,
      total: population,
    });
    data.total += population;
    subRegionObj.total += population;
    regionObj.total += population;
  });
  return data;
};

const ChartPage: FC = (): JSX.Element => {
  const [status, setStatus] = useState(`No Data`);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState<ChartData>({ ...blankData });
  const countries: Countries = useAppSelector(selectCountries);
  useEffect(() => {
    if (countries) {
      const data = prepareChartData(countries);
      setData(data);
      setStatus(`Loaded`);
    } else {
      setStatus(`No Data`);
    }
  }, [countries]);
  return (
    <>
      <header>
        <Header title={`Sunburst Chart ${toggle ? `1` : `2`}`} />
      </header>
      <main>
        <section className='Chart-Section'>
          <h3>World Population</h3>
          <Button onClick={() => setToggle(!toggle)}>Switch Chart</Button>
          {status === `Loaded` && toggle && (
            <ZoomableSunburstChart1 height={200} width={200} data={data} />
          )}
          {status === `Loaded` && !toggle && (
            <ZoomableSunburstChart2 height={200} width={200} data={data} />
          )}
          {status !== `Loaded` && <h4>{status}</h4>}
        </section>
      </main>
    </>
  );
};

export default ChartPage;

/** <SunburstChart data={data} radius={200} size={600} /> */
