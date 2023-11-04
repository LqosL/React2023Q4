import {ReactNode} from "react";

export default function PaginationWrapper({itemsPerPage, currentPage, changePagination}: {itemsPerPage: string, currentPage: string, changePagination: (pageNum: string, pageSize: string)=> void}): ReactNode {
    return (
        <div className='paginWrapper'>
            <div>
                <button id='prevBtn' className='paginBtn' onClick={() => changePagination((parseInt(currentPage) - 1).toString(), itemsPerPage)}> Prev page </button>
                <span id='paginDisplay'> {currentPage} </span>
                <button id='nextBtn' className='paginBtn' onClick={() => changePagination((parseInt(currentPage) + 1).toString(), itemsPerPage)}> Next page </button>
            </div>
            <div>
                <label>
                    Show by
                    <input type='number' min={5} max={10} id='sizeInput' defaultValue={itemsPerPage}/>
                </label>
            </div>
        </div>
    )
}