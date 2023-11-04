import { Result } from '../types/Result';
import React, { ReactNode } from 'react';

export function ResultsUnit({
  title,
  author_name,
  first_publish_year,
  key,
  onClick,
}: Result & { onClick: () => object }): ReactNode {
  const resultOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <li className="results_unit" onClick={resultOnClick} key={key}>
      <span className="info results_title">{title}</span>
      <span className="info results_author">{author_name}</span>
      <span className="info results_first-published">{first_publish_year}</span>
    </li>
  );
}
