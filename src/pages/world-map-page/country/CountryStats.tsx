import { memo } from 'react';

import { SimpleMap } from '../simple-map/SimpleMap.jsx';
import CountryDetails from './CountryDetails.js';
import CountryList from './CountryList.js';

const CountryStats = memo(() => (
  <>
    <div className='flex grow-0 flex-col'>
      <div className='text-ellipsis whitespace-nowrap'>Countries</div>
      <CountryList />
    </div>
    <div className='dlt-map-container flex grow flex-col'>
      <h3>World Map</h3>
      <SimpleMap />
      <CountryDetails />
    </div>
  </>
));

export default CountryStats;
