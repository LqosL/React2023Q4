import React, { ReactNode } from 'react';

export default function SearchSection({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <div className="section search_section">{children}</div>;
}
