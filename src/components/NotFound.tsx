import {ReactNode} from "react";

export default function NotFound(): ReactNode {
    return (
        <div role={'NotFoundPage'} className={'not-found'} >
            404
            <br/>
            Sorry, there is nothing in here. Check the address again
        </div>
    )
}