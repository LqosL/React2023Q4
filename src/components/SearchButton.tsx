import React, { ReactNode } from 'react';

export default function SearchButton({
  onClick,
}: {
  onClick: () => void;
}): ReactNode {
  return (
    <button role='search_button' onClick={onClick} className="search_button">
      SEARCH
    </button>
  );
}
