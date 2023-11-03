import {ReactNode} from "react";

export default function PaginationWrapper({itemsPerPage = 7, currentPage = 0}): ReactNode {
    return (
        <div className='paginWrapper'>
            <div>
                <button id='prevBtn' className='paginBtn'> Prev page </button>
                <span id='paginDisplay'> {currentPage + 1 } </span>
                <button id='nextBtn' className='paginBtn'> Next page </button>
            </div>
            <div>
                <label>
                    Show by
                    <input type='number' min={5} max={10} id='sizeInput' value={itemsPerPage}/>
                </label>
            </div>
        </div>
    )
}