import {ReactNode} from "react";

let hasThrownMessage: boolean = false;

export default function ErrorThrower({mustThrow}: { mustThrow: boolean }): ReactNode {
    if (mustThrow) {
        if (hasThrownMessage) return (<></>);
        hasThrownMessage = true;
        throw new Error('OOPS! There is an error. Please, reload the page')
    }
    hasThrownMessage = false;
    return (<></>);
}