import {ReactNode} from "react";

export default function Error_messager (): ReactNode {
  return (<div className='error'> OOPS! Something went wrong. Please, reload the page </div>);
}

let hasThrownMessage: boolean = false;

export function Error_thrower ({mustThrow}: {mustThrow: boolean}): ReactNode {
  if (mustThrow) {
    if (hasThrownMessage) return (<></>);
    hasThrownMessage = true;
    throw new Error('OOPS! There is an error. Please, reload the page')
  }
  hasThrownMessage = false;
  return (<></>);
}
