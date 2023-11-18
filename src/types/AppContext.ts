import { Result } from './Result';

export type AppContext = {
  searchString: string;
  results: Array<Result>;
  setSearch: (newSearch: string) => void;
  setResults: (newResults: Array<Result>) => void;
};
