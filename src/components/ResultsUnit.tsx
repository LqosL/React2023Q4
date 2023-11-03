import {Result} from "../types/Result";
import React, {ReactNode} from "react";

export function ResultsUnit(
    {title, author_name, first_publish_year}: Result,
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