import { ReactNode } from 'react';

export default function ErrorMessager(): ReactNode {
  return (
    <div className="error">
      {' '}
      OOPS! Something went wrong. Please, reload the page{' '}
    </div>
  );
}
