import axios from 'axios';

import { Countries, Country, setCountries } from '../state/appSlice';
import { AppDispatch } from '../state/store';

export default class DataLoader {
  public async loadCountries(appDispatch: AppDispatch): Promise<boolean> {
    try {
      const res: { data: Country[] } = await axios.get(
        `https://restcountries.com/v2/all?fields=name,capital,region,subregion,population,alpha3Code,flag,altSpellings`
      );
      res.data.forEach((current: Country) => {
        current.key = `${current.name}-${current.alpha3Code}`;
        current.shortName = current.name;
        if (current.altSpellings) {
          current.altSpellings
            .sort((a, b) => b.length - a.length)
            .forEach((spelling: string) => {
              if (
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
      const countries: Countries = { items: res.data };
      appDispatch(setCountries(countries));
      return true;
    } catch (e) {
      setCountries({ items: [] });
      return false;
    }
  }
}
