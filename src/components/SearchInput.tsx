import React, {ReactNode, useContext} from 'react';
import {AppContextVariant} from "../AppContext";

export default function SearchInput(): ReactNode {
  const { searchString, setSearch } = useContext(AppContextVariant)
  return (
    <input
      type="text"
      className="search_input"
      placeholder="Enter the book or the author..."
      value={searchString}
      onInput={(e: React.FormEvent<HTMLInputElement>) =>
          setSearch(e.currentTarget.value)
      }
    ></input>
  );
}
