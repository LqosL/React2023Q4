import React, {ReactNode} from 'react';
import {Result} from '../types/Result';
import {ResultsUnit} from "./ResultsUnit";

export default function Results_section({
  results, inLoadingNow
}: {
  results: Array<Result>;
  inLoadingNow: boolean;
}): ReactNode {
  if (results.length <= 0 && !inLoadingNow) {
    return (
      <div className="empty_list">
        We are terribly sorry, but nothing was found
      </div>
    );
  }
  if (inLoadingNow) {
    return (<div></div>)
  }
  return (
    <div>
      <ul className="results_list">
        {results.map((value, index) => {
          return ResultsUnit(value, index);
        })}
      </ul>
    </div>
  );
}
