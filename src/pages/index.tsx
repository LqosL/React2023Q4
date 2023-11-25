import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Result } from '../types/Result';
import React, { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import PaginationWrapper from '../components/PaginationWrapper';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorMessager from '../components/ErrorMessager';
import ErrorThrower from '../components/ErrorThrower';
import SearchSection from '../components/SearchSection';
import SearchInput from '../components/SearchInput';
import SearchButton from '../components/SearchButton';
import ResultsSection from '../components/SectionResults';
import ErrorButton from '../components/ErrorButton';
import { ParsedUrlQuery } from 'querystring';
import {useRouter} from "next/router";
import urlBuilder from "../utils/urlBuilder";

type pageState = {
  search: string;
  page: string;
  count: string;
  json: { docs: Array<Result> };
};

export interface Request extends ParsedUrlQuery {
  search?: string;
  page?: string;
  count?: string;
}

export const getServerSideProps = (async (ctx) => {
  const queryAsParams = ctx.query as Request;
  const page = parseInt(queryAsParams?.page || '1');
  const count = parseInt(queryAsParams?.count || '7');
  const resultPage = isNaN(page) ? 1 : page;
  const resultCount = isNaN(count) ? 7 : count;
  const search = queryAsParams?.search || 'hello';

  const res = await fetch(
    `https://openlibrary.org/search.json?q=${search}&page=${page}&limit=${count}`
  );
  const json: { docs: Array<Result> } = await res.json();

  return {
    props: {
      search: search,
      page: resultPage.toString(),
      count: resultCount.toString(),
      json: json,
    },
  };
}) satisfies GetServerSideProps<pageState>;

export default function Page(
  pageState: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();

  const itemsPerPage = pageState.count;
  const results: { docs: Array<Result> } = pageState.json || [];

  const [searchInputState, setSearchInputState]: [
    string,
    (value: ((prevState: string) => string) | string) => void,
  ] = useState(pageState.search);

  const [mustThrowError, setMustThrowError]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false);

  function changePagination(pageNum: string, pageSize: string): void {
    let page = pageNum;
    if (parseInt(page) < 1) {
      page = '1'
    }
    let count = pageSize;
    if (parseInt(count) < 5) {
      count = '5'
    }
    if (parseInt(count) > 15) {
      count = '15'
    }
    router.push(urlBuilder(
        undefined,
        page,
        count,
        searchInputState
    ))
  }

  const temporalIsLoading = false;
  const loadingContent: ReactNode = temporalIsLoading ? (
    <div className="loader">...LOADING LIST...</div>
  ) : (
    <PaginationWrapper
      currentPage={pageState.page}
      currentCount={itemsPerPage}
      changePagination={changePagination}
    />
  );

  // const navigate = useNavigate();
  // const location = useLocation();

  async function showDetails(key: string): Promise<void> {
    // navigate({ pathname: key, search: location.search });
    // dispatcher(updateViewMode(true));
    console.log('show details', key);
  }

  return (
    <>
      <ErrorBoundary fallback={() => ErrorMessager()}>
        <ErrorThrower mustThrow={mustThrowError} />
        <SearchSection>
          <SearchInput
            searchInputState={searchInputState}
            setSearchInputState={(newString: string) =>
              setSearchInputState(newString)
            }
          />
          <SearchButton
            onClick={() => {
              console.log('clicked search');
              router.push(urlBuilder(
                  undefined,
                  pageString,
                  itemsPerPage,
                  searchInputState
              ))
            }}
          />
        </SearchSection>
        <div className={'main'}>
          <ResultsSection
            results={results.docs}
            inLoadingNow={false}
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
