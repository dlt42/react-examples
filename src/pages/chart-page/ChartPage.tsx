import { FC, useEffect, useState } from 'react';

import Button from '../../components/Button/Button.js';
import Header from '../../components/Header/Header.js';
import { useAppSelector } from '../../hooks/useAppDispatch/useAppDispatch.js';
import { selectCountries } from '../../state/appSlice.js';
import { Countries } from '../world-map-page/country/Country.types.js';
import { ZoomableSunburstChart1 } from './zoomable-sunburst/ZoomableSunburstChart1.jsx';
import { ZoomableSunburstChart2 } from './zoomable-sunburst/ZoomableSunburstChart2.jsx';

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
  countries.forEach((current) => {
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
        <section className='flex flex-col items-center overflow-hidden'>
          <h3>World Population</h3>
          <div className='p-1'>
            <Button onClick={() => setToggle(!toggle)}>Switch Chart</Button>
          </div>
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
