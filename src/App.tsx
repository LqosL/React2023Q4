import {useState} from 'react';
import './App.css';
import Results_section from './components/section_results';
import Search_button from './components/search_button';
import Search_input from './components/search_input';
import Search_section from './components/search_section';
import {Result} from "./Result";

function App() {
  const [searchState, setSearchState] = useState('');

  const [results, setResults] = useState<Array<Result>>([]);

  async function doSearch(): Promise<Array<Result>> {
    const request: string =
      'https://openlibrary.org/search.json?q=' + searchState.trim() + '&page=1&limit=7';
    const responce = await fetch(request).then((res) => res.json());
    setResults(responce['docs']);
    return responce['docs'];
  }

  return (
    <>
      <Search_section>
        <Search_input state={searchState} onStateChange={setSearchState} />
        <Search_button onClick={doSearch} />
      </Search_section>
      <Results_section results={results} />
    </>
  );
}

export default App;
