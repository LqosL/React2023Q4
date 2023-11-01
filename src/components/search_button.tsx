import React, { ReactNode } from 'react';

export default function Search_button({
  onClick,
}: {
  onClick: () => void;
}): ReactNode {
  return (
    <button onClick={onClick} className="search_button">
      SEARCH
    </button>
  );
}
