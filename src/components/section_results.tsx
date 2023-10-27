import React, { ReactNode} from "react";

export function Results_unit({name, desc}: {name: string, desc: string}):ReactNode {
  return (
    <li className='results_unit'>
      <span className='results_name'>
        {name}
      </span>
      <span className='results_descr'>
        {desc}
      </span>
    </li>
  )
}

export default function Results_section (results: Array<{name: string, desc: string}>): ReactNode {
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
