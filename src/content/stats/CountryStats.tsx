import { memo } from 'react';

import CountryDetails from './CountryDetails.js';
import CountryList from './CountryList.js';
import { SimpleMap } from './worldMap/SimpleMap.jsx';

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
