import React, {ReactNode, useEffect, useState} from 'react';
import './App.css';
import Results_section from './components/SectionResults';
import SearchButton from './components/SearchButton';
import SearchInput from './components/SearchInput';
import SearchSection from './components/SearchSection';
import { Result } from './types/Result';
import ErrorButton from './components/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary';
import { DefaultLs_wrapper } from './components/ls_wrapper';
import ErrorMessager from "./components/ErrorMessager";
import PaginationWrapper from "./components/PaginationWrapper";
import ErrorThrower from "./components/ErrorThrower";

function App(): ReactNode {
  const [isLoading, setIsLoading]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
  const [searchInputState, setSearchInputState]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('hello');
  const [results, setResults]: [Array<Result>, React.Dispatch<React.SetStateAction<Array<Result>>>] = useState<Array<Result>>([]);
  const [mustThrowError, setMustThrowError]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false);
  const [requireSearch, setRequireSearch] = useState(true);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function doSearch(searchState: string): Promise<Array<Result>> {
    let searchString = searchState.trim();

    if (searchString.length === 0) {
      searchString = searchInputState;
    }

    setSearchInputState(searchString);
    setIsLoading(true);

    const request: string =
        'https://openlibrary.org/search.json?q=' +
        (searchString.length ? searchString : 'hello') +
        '&page=1&limit=7';
    const response = await fetch(request)
        .then((res: Response) => res.json())
        .catch(() => {
          return []
        });
    setResults(response['docs'] || []);
    setIsLoading(false);
    return response['docs'] || [];
  }

  useEffect((): void => {
    if (requireSearch) {
      setRequireSearch(false);
      doSearch(DefaultLs_wrapper.getLastSearch());
    }
  }, [requireSearch, setRequireSearch, doSearch]);

  const loadingContent: ReactNode = isLoading?(<div className='loader'>...LOADING...</div>):(<></>);

  return (
      <>
        <ErrorBoundary fallback={() => ErrorMessager()}>
          <ErrorThrower mustThrow={mustThrowError}/>
          <SearchSection>
            <SearchInput
                state={searchInputState}
                onStateChange={(newValue: string) => {
                  setSearchInputState(newValue);
                  DefaultLs_wrapper.setLastSearch(newValue);
                }
              }
            />
            <SearchButton
                onClick={() => doSearch(searchInputState)}
            />
          </SearchSection>
          {loadingContent}
          <Results_section results={results} inLoadingNow={isLoading} />
          <ErrorButton
              onClick={() => {
                setMustThrowError(true)
              }}
          />
          <PaginationWrapper/>
        </ErrorBoundary>
      </>
  );
}

export default App;