import { z } from 'zod';

export type CountryCode = string | null;

export type Country = {
  key?: string;
  name: string;
  capital?: string;
  region: string;
  subregion: string;
  population: number;
  alpha3Code: CountryCode;
  flag: string;
  altSpellings?: string[];
  shortName?: string;
};

export type Countries = Country[];

export type CountriesResponse = { data: Country[] };

export const countriesDtoSchema: z.Schema<CountriesResponse> = z.object({
  data: z.array(
    z.object({
      key: z.string().optional(),
      name: z.string(),
      capital: z.string().optional(),
      region: z.string(),
      subregion: z.string(),
      population: z.number(),
      alpha3Code: z.string().nullable(),
      flag: z.string(),
      altSpellings: z.array(z.string()).optional(),
      shortName: z.string().optional(),
    })
  ),
});
