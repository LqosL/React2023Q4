import { ReactNode, useState } from 'react';
import { Result } from './types/Result';
import { AppContextVariant } from './AppContext';
import { AppContext } from './types/AppContext';
import App from './App';
import { DefaultLs_wrapper } from './components/ls_wrapper';

export default function AppContainer(): ReactNode {
  const [searchInputState, setSearchInputState]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('hello');
  const [results, setResults]: [
    Array<Result>,
    React.Dispatch<React.SetStateAction<Array<Result>>>,
  ] = useState<Array<Result>>([]);

  function proxySetSearch(search: string) {
    DefaultLs_wrapper.setLastSearch(search);
    setSearchInputState(search);
  }

  const containerContext: AppContext = {
    searchString: searchInputState,
    setSearch: proxySetSearch,
    results,
    setResults,
  };

  return (
    <AppContextVariant.Provider value={containerContext}>
      <App />
    </AppContextVariant.Provider>
  );
}
