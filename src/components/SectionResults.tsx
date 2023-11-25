import React, { ReactNode } from 'react';
import { Result } from '../types/Result';
import { ResultsUnit } from './ResultsUnit';

export default function ResultsSection({
  results,
  inLoadingNow,
  onItemSelected,
}: {
  results: Result[];
  inLoadingNow: boolean;
  onItemSelected: (result: Result) => object;
}): ReactNode {
  if (inLoadingNow) {
    return <div></div>;
  }
  if ((!results && !inLoadingNow) || (results.length <= 0 && !inLoadingNow)) {
    return (
      <div role="EmptyList" className="empty_list">
        Nothing found yet
      </div>
    );
  }
  console.log(results);
  return (
    <div>
      <ul role="ResultsList" className="results_list">
        {results.map((value: Result) => {
          const onClick = () => onItemSelected(value);
          return ResultsUnit({ ...value, onClick });
        })}
      </ul>
    </div>
  );
}
