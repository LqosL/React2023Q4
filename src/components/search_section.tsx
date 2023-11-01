import React, { ReactNode } from 'react';

export default function Search_section({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return <div className="section search_section">{children}</div>;
}
