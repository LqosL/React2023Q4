import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import {Result} from '../types/Result';
import React, {ReactNode, useEffect, useState} from 'react';
import PaginationWrapper from '../components/PaginationWrapper';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorMessager from '../components/ErrorMessager';
import ErrorThrower from '../components/ErrorThrower';
import SearchSection from '../components/SearchSection';
import SearchInput from '../components/SearchInput';
import SearchButton from '../components/SearchButton';
import ResultsSection from '../components/SectionResults';
import ErrorButton from '../components/ErrorButton';
import {useRouter} from 'next/router';
import urlBuilder from '../utils/urlBuilder';
import SectionDetailsContainer from '../components/SectionDetailsContainer';
import {PageState} from "../types/PageState";
import {Request} from "../types/Request";

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
}) satisfies GetServerSideProps<PageState>;

export default function Page(
  pageState: InferGetServerSidePropsType<typeof getServerSideProps> & PageState
) {
  const router = useRouter();
  const itemsPerPage = pageState.count;
  const results: { docs: Array<Result> } = pageState.json || [];
  const currentResp: {docs: Array<Result>} = pageState.json;

  const [searchInputState, setSearchInputState]: [
    string,
    (value: ((prevState: string) => string) | string) => void,
  ] = useState(pageState.search);

  const [mustThrowError, setMustThrowError]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false);

  const [loaderMain, setLoaderMain]: [
      loaderMain: boolean, setLoaderMain: React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const [currentDetailKey, setCurrentDetailKey]: [
    currentDetails: string|undefined, setCurrentDetails: React.Dispatch<React.SetStateAction<string|undefined>>
 ] = useState(pageState.details?.details?.key);

  const [recentState, setRecentState]: [
    recentState: {docs: Array<Result>}, setRecentState: React.Dispatch<React.SetStateAction<{docs: Array<Result>}>>
  ] = useState(currentResp);

  useEffect(() => {
    if (recentState == currentResp) return;
    setLoaderMain(false)
    setRecentState(currentResp)
  }, [recentState,
      currentResp])

  function changePagination(pageNum: string, pageSize: string): void {
    let page = pageNum;
    let count = pageSize;

    if (parseInt(page) < 1) page = '1';
    if (parseInt(count) < 5) count = '5';
    if (parseInt(count) > 15) count = '15';

    setLoaderMain(true)
    setCurrentDetailKey(undefined)
      setTimeout(() => {
          router.push(urlBuilder(undefined, page, count, searchInputState));
      }, 1);
  }

  function closeDetails() {
    setCurrentDetailKey(undefined)
      setTimeout(() => {
          router.push(urlBuilder(undefined, pageState.page, itemsPerPage, searchInputState))
      }, 1);
  }

  const loadingContent: ReactNode = loaderMain ? (
    <div className="loader">...LOADING LIST...</div>
  ) : (
    <PaginationWrapper
      currentPage={pageState.page}
      currentCount={itemsPerPage}
      changePagination={changePagination}
    />
  );

  async function showDetails(key: string): Promise<void> {
    setCurrentDetailKey(key)
    setTimeout(() => {
        router.push(
            urlBuilder(key, pageState.page, itemsPerPage, searchInputState)
        );
    }, 1);
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
              setLoaderMain(true);
                setCurrentDetailKey(undefined);
            setTimeout(() => {
                router.push(
                    urlBuilder(
                        undefined,
                        pageState.page,
                        itemsPerPage,
                        searchInputState
                    )
                );
            }, 1);
            }}
          />
        </SearchSection>
        <div className={'main'}>
          <ResultsSection
            results={results.docs}
            inLoadingNow={loaderMain}
            onItemSelected={(result: Result) => showDetails(result.key)}
          />
            <SectionDetailsContainer details={pageState.details} currentDetailKey={currentDetailKey} closeDetails={closeDetails}/>

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
