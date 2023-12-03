import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Tile from './Tile';
import { ResultsStack } from './redux/resultsSlice';
import { useSelector } from 'react-redux';

function App() {
  const historySlice: ResultsStack = useSelector<{ results: ResultsStack }>(
    (state) => state.results
  ) as ResultsStack;

  return (
    <main>
      <div>Hey Hey You</div>
      <h1>Let&apos;s use your personal data</h1>

      <div className={'links_wrapper'}>
        <button className={'form-link__button'}>
          <Link to={'/liveform'}> That&apos;s live form</Link>
        </button>
        <button className={'form-link__button'}>
          <Link to={'/refform'}> That&apos;s another form</Link>
        </button>
      </div>

      <div className={'results_wrapper'}>Here there will be your results</div>
      {historySlice.results.map((form, index) => {
        if (index === historySlice.results.length - 1) {
          return (
            <div className={'newest_tile'} key={index}>
              NEWEST:
              <Tile key={JSON.stringify(form)} {...form} />
            </div>
          );
        }
        return <Tile key={JSON.stringify(form)} {...form} />;
      })}
    </main>
  );
}

export default App;
