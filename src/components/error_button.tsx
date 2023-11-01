import React, { ReactNode } from 'react';

export default function Error_button({
  onClick,
}: {
  onClick: () => void;
}): ReactNode {
  return (
    <button onClick={onClick} className="error_button">
      THROW AN ERROR
    </button>
  );
}
