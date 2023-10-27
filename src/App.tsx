import { useState } from 'react'
import './App.css'
import Results_section from "./components/section_results";
import Search_button from "./components/search_button";
import Search_input from "./components/search_input";
import Search_section from "./components/search_section";

function App() {
  const [searchState, setSearchState] = useState("")

  const results = [{name: 'blah', desc:'blah'}];

  return (
    <>
      <Search_section >
        <Search_input state={searchState} onStateChange={setSearchState}/>
        <Search_button />
      </Search_section>
      {Results_section(results)}
    </>
  )
}

export default App
