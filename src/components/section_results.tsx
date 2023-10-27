import React, { ReactNode} from "react";
import {Result} from "../Result";

export function Results_unit({title, author_name, first_publish_year}: Result):ReactNode {
  return (
    <li className='results_unit'>
      <span className='info results_title'>
        {title}
      </span>
      <span className='info results_author'>
        {author_name}
      </span>
      <span className='info results_first-published'>
        {first_publish_year}
      </span>
    </li>
  )
}

export default function Results_section ({results}: {results: Array <Result>}): ReactNode {
  return (
    <div>
      <ul className='results_list'>
        {results.map(value => {
          return Results_unit(value);
        })}
      </ul>
    </div>
  )
}
