import React, { ReactNode } from 'react';
import { Result } from '../Result';

export function Results_unit(
  { title, author_name, first_publish_year }: Result,
  index: number
): ReactNode {
  return (
    <li className="results_unit" key={index}>
      <span className="info results_title">{title}</span>
      <span className="info results_author">{author_name}</span>
      <span className="info results_first-published">{first_publish_year}</span>
    </li>
  );
}

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
          return Results_unit(value, index);
        })}
      </ul>
    </div>
  );
}
