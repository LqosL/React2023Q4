import {Component, ReactNode} from 'react';
import './App.css';
import Results_section from './components/section_results';
import Search_button from './components/search_button';
import Search_input from './components/search_input';
import Search_section from './components/search_section';
import { Result } from './Result';
import Error_button from './components/error_button';
import ErrorBoundary from './components/error_boundary';
import { DefaultLs_wrapper } from './components/ls_wrapper';
import Error_messager, {Error_thrower} from "./components/error_message";

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
        <ErrorBoundary fallback={() => Error_messager()}>
          <Error_thrower mustThrow={this.state.throwError}/>
          <Search_section>
            <Search_input
              state={this.searchInputState}
              onStateChange={(newValue: string) =>
                this.setSearchInputState(newValue)
              }
            />
            <Search_button
              onClick={() => this.doSearch(this.searchInputState)}
            />
          </Search_section>
          {loadingContent}
          <Results_section results={this.results} inLoadingNow={this.state.loading} />
          <Error_button
            onClick={() => {
              this.setState(Object.assign(this.state, {throwError: true}))
            }}
          ></Error_button>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
