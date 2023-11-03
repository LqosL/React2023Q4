import {Component, ReactNode} from 'react';
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

type AppState = {
  loading: boolean;
  throwError: boolean;
}
class App extends Component<object, AppState> {
  searchInputState: string = DefaultLs_wrapper.getLastSearch();
  results: Array<Result> = [];
  isMounted: boolean = false;
  async doSearch(searchState: string): Promise<Array<Result>> {
    DefaultLs_wrapper.setLastSearch(this.searchInputState);
    this.results = [];
    if (this.isMounted) {
      this.setState({loading: true});
    }
    const searchString = searchState.trim();
    const request: string =
      'https://openlibrary.org/search.json?q=' +
      (searchString.length ? searchString : 'hello') +
      '&page=1&limit=7';
    const response = await fetch(request).then((res: Response) => res.json());
    this.setResults(response['docs']);
    if (this.isMounted) {
      this.setState({loading: false});
    }
    return response['docs'];
  }
  constructor(props: object) {
    super(props);
      this.state = {loading: true, throwError: false}
    this.doSearch(this.searchInputState);
  }
  setSearchInputState(state: string) {
    this.searchInputState = state;
    this.isMounted ? this.forceUpdate() : null;
  }
  setResults(results: Array<Result>) {
    this.results = results;
    if (this.isMounted) {
      this.forceUpdate();
    }
  }

  componentDidMount() {
    this.isMounted = true;
  }

  componentWillUnmount() {
    this.isMounted = false;
  }
  render() {
    const loading: boolean = this.state.loading;
    const loadingContent: ReactNode = loading?(<div className='loader'>...LOADING...</div>):(<></>);
    return (
      <>
        <ErrorBoundary fallback={() => ErrorMessager()}>
          <ErrorThrower mustThrow={this.state.throwError}/>
          <SearchSection>
            <SearchInput
              state={this.searchInputState}
              onStateChange={(newValue: string) =>
                this.setSearchInputState(newValue)
              }
            />
            <SearchButton
              onClick={() => this.doSearch(this.searchInputState)}
            />
          </SearchSection>
          {loadingContent}
          <Results_section results={this.results} inLoadingNow={this.state.loading} />
          <ErrorButton
            onClick={() => {
              this.setState(Object.assign(this.state, {throwError: true}))
            }}
          ></ErrorButton>
          <PaginationWrapper/>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
