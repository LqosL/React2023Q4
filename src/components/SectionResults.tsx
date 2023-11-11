import React, {ReactNode, useContext} from 'react';
import { Result } from '../types/Result';
import { ResultsUnit } from './ResultsUnit';
import {AppContextVariant} from "../AppContext";

export default function ResultsSection({
  inLoadingNow,
  onItemSelected,
}: {
  inLoadingNow: boolean;
  onItemSelected: (result: Result) => object;
}): ReactNode {
    const { results } = useContext(AppContextVariant)
  if (inLoadingNow) {
    return <div></div>;
  }
  if (results.length <= 0 && !inLoadingNow) {
    return (
        <div role="EmptyList" className="empty_list">
          Nothing found yet
        </div>
    );
  }
  return (
    <div>
      <ul role="ResultsList" className="results_list" >
        {results.map((value: Result) => {
          const onClick = () => onItemSelected(value);
          return ResultsUnit({ ...value, onClick });
        })}
      </ul>
    </div>
  );
}
