import React, { createContext } from 'react';
import { AppContext } from './types/AppContext';
import { DefaultLs_wrapper } from './components/ls_wrapper';

export const AppContextVariant: React.Context<AppContext> =
  createContext<AppContext>({
    searchString: DefaultLs_wrapper.getLastSearch(),
    results: [],
    setSearch: () => {},
    setResults: () => {},
  });
