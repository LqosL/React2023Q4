import React, { createContext } from 'react';
import { AppContext } from './types/AppContext';

export const AppContextVariant: React.Context<AppContext> =
  createContext<AppContext>({
    searchString: 'hello',
    results: [],
    setSearch: () => {},
    setResults: () => {},
  });
