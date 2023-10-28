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
  results,
}: {
  results: Array<Result>;
}): ReactNode {
  if (results.length <= 0) {
    return (
      <div className="empty_list">
        We are terribly sorry, but something went wrong
      </div>
    );
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
