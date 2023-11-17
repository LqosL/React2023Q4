import React, { ReactNode, useEffect, useState } from 'react';
import './App.css';
import ResultsSection from './components/SectionResults';
import SearchButton from './components/SearchButton';
import SearchInput from './components/SearchInput';
import SearchSection from './components/SearchSection';
import { Result } from './types/Result';
import ErrorButton from './components/ErrorButton';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorMessager from './components/ErrorMessager';
import PaginationWrapper from './components/PaginationWrapper';
import ErrorThrower from './components/ErrorThrower';
import {
  NavigateOptions,
  Outlet,
  URLSearchParamsInit,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SearchStatePart, updateSearch } from './redux/searchSlice';
import { ResultsStatePart, updateResults } from './redux/resultsSlice';
import {
  ItemsPerPageStatePart,
  updateItemsPerPage,
} from './redux/itemsPerPageSlice';
import { LoaderMainStatePart, updateLoaderMain } from './redux/loaderMainSlice';
import { updateViewMode } from './redux/viewModeSlice';

function App(): ReactNode {
  const dispatcher = useDispatch();
  const searchString = useSelector(
    (state: SearchStatePart) => state.search.search
  );
  const results = useSelector(
    (state: ResultsStatePart) => state.results.results
  );
  const itemsPerPage: string = useSelector(
    (state: ItemsPerPageStatePart) => state.itemsPerPage.itemsPerPage
  );
  const loaderMain: boolean = useSelector(
    (state: LoaderMainStatePart) => state.loaderMain.loaderMain
  );

  const [searchInputState, setSearchInputState]: [
    string,
    (value: ((prevState: string) => string) | string) => void,
  ] = useState(searchString);

  const [mustThrowError, setMustThrowError]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false);
  const [requireSearch, setRequireSearch]: [
    requireSearch: boolean,
    setRequireSearch: React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(true);

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
      return params;
    });
    dispatcher(updateItemsPerPage(pageSize));
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function doSearch(): Promise<Array<Result>> {
    dispatcher(updateLoaderMain(true));

    let searchStringTrimmed = searchInputState.trim();
    if (searchStringTrimmed.length === 0) {
      searchStringTrimmed = searchInputState;
    }
    const request: string =
      'https://openlibrary.org/search.json?q=' +
      (searchStringTrimmed.length ? searchStringTrimmed : searchInputState) +
      '&page=' +
      page +
      '&limit=' +
      itemsPerPage;
    const response = await fetch(request)
      .then((res: Response) => res.json())
      .catch(() => {
        return undefined;
      });

    dispatcher(updateResults(response['docs'] || []));
    dispatcher(updateLoaderMain(false));

    return response['docs'] || [];
  }

  useEffect((): void => {
    if (requireSearch) {
      setRequireSearch(false);
      doSearch();
    }
  }, [requireSearch, setRequireSearch, doSearch]);

  const loadingContent: ReactNode = loaderMain ? (
    <div className="loader">...LOADING LIST...</div>
  ) : (
    <PaginationWrapper
      currentPage={searchQueryParams.get('page') || '1'}
      changePagination={changePagination}
    />
  );

  const navigate = useNavigate();
  const location = useLocation();

  async function showDetails(key: string): Promise<void> {
    navigate({ pathname: key, search: location.search });
    dispatcher(updateViewMode(true));
  }

  return (
    <>
      <ErrorBoundary fallback={() => ErrorMessager()}>
        <ErrorThrower mustThrow={mustThrowError} />
        <SearchSection>
          <SearchInput
            searchInputState={searchInputState}
            setSearchInputState={setSearchInputState}
          />
          <SearchButton
            onClick={() => {
              dispatcher(updateSearch({ text: searchInputState }));
              doSearch();
            }}
          />
        </SearchSection>
        <div className={'main'}>
          <ResultsSection
            results={results}
            inLoadingNow={loaderMain}
            onItemSelected={(result: Result) => showDetails(result.key)}
          />
          <Outlet />
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
