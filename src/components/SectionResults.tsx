import React, { ReactNode } from 'react';
import { Result } from '../types/Result';
import { ResultsUnit } from './ResultsUnit';

export default function ResultsSection({
  results,
  inLoadingNow,
  onItemSelected,
}: {
  results: Array<Result>;
  inLoadingNow: boolean;
  onItemSelected: (result: Result) => object;
}): ReactNode {
  if (results.length <= 0 && !inLoadingNow) {
    return (
      <div className="empty_list">
        We are terribly sorry, but nothing was found
      </div>
    );
  }
  if (inLoadingNow) {
    return <div></div>;
  }
  return (
    <div>
      <ul className="results_list">
        {results.map((value: Result) => {
          const onClick = () => onItemSelected(value);
          return ResultsUnit({ ...value, onClick });
        })}
      </ul>
    </div>
  );
}
