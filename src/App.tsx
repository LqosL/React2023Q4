import { Component } from 'react';
import './App.css';
import Results_section from './components/section_results';
import Search_button from './components/search_button';
import Search_input from './components/search_input';
import Search_section from './components/search_section';
import { Result } from './Result';
import Error_button from './components/error_button';
import ErrorBoundary, { activateError } from './components/error_boundary';

class App extends Component {
  searchInputState: string = '';
  results: Array<Result> = [];
  isMounted: boolean = false;

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
  async doSearch(searchState: string): Promise<Array<Result>> {
    const request: string =
      'https://openlibrary.org/search.json?q=' +
      searchState.trim() +
      '&page=1&limit=7';
    const response = await fetch(request).then((res: Response) => res.json());
    this.setResults(response['docs']);
    return response['docs'];
  }

  render() {
    return (
      <>
        <ErrorBoundary>
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
          <Results_section results={this.results} />
          <Error_button
            onClick={() => {
              activateError();
            }}
          ></Error_button>
        </ErrorBoundary>
      </>
    );
  }
}

export default App;
