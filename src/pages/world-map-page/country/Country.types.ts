export type CountryCode = string | null;

export type Country = {
  key: string;
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  alpha3Code: CountryCode;
  flag: string;
  altSpellings: string[];
  shortName: string;
};

export type Countries = {
  items: Country[];
};
