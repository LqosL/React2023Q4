import React, { ReactNode } from 'react';

export default function SearchInput({
  searchInputState,
  setSearchInputState,
}: {
  searchInputState: string;
  setSearchInputState: (newString: string) => void;
}): ReactNode {
  // const { searchString, setSearch } = useContext(AppContextVariant);
  return (
    <input
      role="search_input"
      type="text"
      className="search_input"
      placeholder="Enter the book or the author..."
      value={searchInputState}
      onInput={(e: React.FormEvent<HTMLInputElement>) =>
        setSearchInputState(e.currentTarget.value)
      }
    ></input>
  );
}
