import React, { ReactNode } from 'react';

export default function ErrorButton({
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
