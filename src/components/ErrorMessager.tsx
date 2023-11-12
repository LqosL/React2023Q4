import { ReactNode } from 'react';

export default function ErrorMessager(): ReactNode {
  return (
    <div role="error_messager" className="error">
      OOPS! Something went wrong. Please, reload the page
    </div>
  );
}
