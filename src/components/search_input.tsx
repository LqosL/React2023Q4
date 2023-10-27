import React, { ReactNode } from 'react';

export default function Search_input({
  state,
  onStateChange,
}: {
  state: string;
  onStateChange: React.Dispatch<React.SetStateAction<string>>;
}): ReactNode {
  return (
    <input
      type="text"
      className="search_input"
      placeholder="Enter the book or the author..."
      value={state}
      onInput={(e) => onStateChange(e.currentTarget.value)}
    ></input>
  );
}
