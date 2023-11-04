import React, { ReactNode, useEffect, useState } from 'react';
import './App.css';
import ResultsSection from './components/SectionResults';
import SearchButton from './components/SearchButton';
import SearchInput from './components/SearchInput';
import SearchSection from './components/SearchSection';
import { Result } from './types/Result';
import ErrorButton from './components/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary';
import { DefaultLs_wrapper } from './components/ls_wrapper';
import ErrorMessager from './components/ErrorMessager';
import PaginationWrapper from './components/PaginationWrapper';
import ErrorThrower from './components/ErrorThrower';
import {
  NavigateOptions,
  URLSearchParamsInit,
  useSearchParams,
} from 'react-router-dom';
import DetailsSection from './components/SectionDetails';
import { Detail } from './types/Detail';

function App(): ReactNode {
  const [listIsLoading, setListIsLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false);
  const [detailsIsLoading, setDetailsIsLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false);
  const [searchInputState, setSearchInputState]: [
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ] = useState('hello');
  const [results, setResults]: [
    Array<Result>,
    React.Dispatch<React.SetStateAction<Array<Result>>>,
  ] = useState<Array<Result>>([]);
  const [mustThrowError, setMustThrowError]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false);
  const [requireSearch, setRequireSearch] = useState(true);

  const [shownDetail, setShownDetail]: [
    Detail | undefined,
    React.Dispatch<React.SetStateAction<Detail | undefined>>,
  ] = useState<Detail | undefined>(undefined);

  const [searchQueryParams, setSearchQueryParams]: [
    URLSearchParams,
    (
      nextInit?:
        | URLSearchParamsInit
        | ((prev: URLSearchParams) => URLSearchParamsInit),
      navigateOpts?: NavigateOptions
    ) => void,
  ] = useSearchParams();

  function changePagination(pageNum: string, pageSize: string): void {
    setSearchQueryParams((params) => {
      params.set('page', pageNum);
      params.set('count', pageSize);
      return params;
    });
    setRequireSearch(true);
  }

  const pageString = searchQueryParams.get('page');
  let page = 1;
  if (pageString != null) {
    let pageIsCorrect = true;
    page = parseInt(pageString);
    if (
      page < 1 ||
      isNaN(parseInt(pageString)) ||
      page.toString() !== pageString
    ) {
      page = 1;
      pageIsCorrect = false;
    }
    if (!pageIsCorrect) {
      setSearchQueryParams((params) => {
        params.set('page', page.toString());
        return params;
      });
      window.location.href = window.location.href
        .toString()
        .replace(`page=${pageString}`, `page=${page}`);
    }
  }

  const countString = searchQueryParams.get('count');
  let count = 7;
  if (countString != null) {
    let countIsCorrect = true;
    count = parseInt(countString);
    if (
      count < 5 ||
      isNaN(parseInt(countString)) ||
      count.toString() !== countString
    ) {
      count = 5;
      countIsCorrect = false;
    }
    if (count > 15) {
      count = 15;
      countIsCorrect = false;
    }
    if (!countIsCorrect) {
      setSearchQueryParams((params) => {
        params.set('count', count.toString());
        return params;
      });
      window.location.href = window.location.href
        .toString()
        .replace(`count=${countString}`, `count=${count}`);
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function doSearch(searchState: string): Promise<Array<Result>> {
    let searchString = searchState.trim();

    if (searchString.length === 0) {
      searchString = searchInputState;
    }

    setSearchInputState(searchString);
    setListIsLoading(true);

    const request: string =
      'https://openlibrary.org/search.json?q=' +
      (searchString.length ? searchString : 'hello') +
      '&page=' +
      page +
      '&limit=' +
      count;
    const response = await fetch(request)
      .then((res: Response) => res.json())
      //TODO:: add catch action
      .catch(() => {
        return [];
      });
    setResults(response['docs'] || []);
    setListIsLoading(false);
    return response['docs'] || [];
  }

  useEffect((): void => {
    if (requireSearch) {
      setRequireSearch(false);
      doSearch(DefaultLs_wrapper.getLastSearch());
    }
  }, [requireSearch, setRequireSearch, doSearch]);

  const loadingContent: ReactNode = listIsLoading ? (
    <div className="loader">...LOADING...</div>
  ) : (
    <PaginationWrapper
      currentPage={searchQueryParams.get('page') || '1'}
      itemsPerPage={searchQueryParams.get('count') || '7'}
      changePagination={changePagination}
    />
  );

  async function getDetails(key: string): Promise<void> {
    setDetailsIsLoading(true);

    const request: string = 'https://openlibrary.org' + key + '.json';
    const response: Detail | undefined = await fetch(request)
      .then((res: Response) => res.json())
      //TODO:: add catch action
      .catch(() => {
        return undefined;
      });

    setShownDetail(response);
    setDetailsIsLoading(false);
  }

  return (
    <>
      <ErrorBoundary fallback={() => ErrorMessager()}>
        <ErrorThrower mustThrow={mustThrowError} />
        <SearchSection>
          <SearchInput
            state={searchInputState}
            onStateChange={(newValue: string): void => {
              setSearchInputState(newValue);
              DefaultLs_wrapper.setLastSearch(newValue);
            }}
          />
          <SearchButton onClick={() => doSearch(searchInputState)} />
        </SearchSection>
        <div className={'main'}>
          <ResultsSection
            results={results}
            inLoadingNow={listIsLoading}
            onItemSelected={(result: Result) => getDetails(result.key)}
          />
          {shownDetail ? (
            <DetailsSection
              details={shownDetail}
              isLoading={detailsIsLoading}
              onClickOutside={() => setShownDetail(undefined)}
            />
          ) : (
            <></>
          )}
        </div>
        <ErrorButton
          onClick={(): void => {
            setMustThrowError(true);
          }}
        />
        {loadingContent}
      </ErrorBoundary>
    </>
  );
}

export default App;
