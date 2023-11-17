import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ItemsPerPageStatePart,
  updateItemsPerPage,
} from '../redux/itemsPerPageSlice';

export default function PaginationWrapper({
  currentPage,
  changePagination,
}: {
  currentPage: string;
  changePagination: (pageNum: string, pageSize: string) => void;
}): ReactNode {
  const dispatcher = useDispatch();
  const itemsPerPage: string = useSelector(
    (state: ItemsPerPageStatePart) => state.itemsPerPage.itemsPerPage
  );

  return (
    <div className="paginWrapper">
      <div>
        <button
          role="prevBtn"
          id="prevBtn"
          className="paginBtn"
          onClick={() =>
            changePagination(
              (parseInt(currentPage) - 1).toString(),
              itemsPerPage
            )
          }
        >
          {'<<'}
        </button>
        <span id="paginDisplay"> {currentPage} </span>
        <button
          role="nextBtn"
          id="nextBtn"
          className="paginBtn"
          onClick={() =>
            changePagination(
              (parseInt(currentPage) + 1).toString(),
              itemsPerPage
            )
          }
        >
          {'>>'}
        </button>
      </div>
      <div>
        <label>
          Show by
          <input
            role="page_size_input"
            type="number"
            min={5}
            max={15}
            id="sizeInput"
            defaultValue={itemsPerPage}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              dispatcher(updateItemsPerPage(event.target.value))
            }
          />
          <button
            role="page_size_submit"
            type={'submit'}
            onClick={() => changePagination('1', itemsPerPage)}
          >
            Apply
          </button>
        </label>
      </div>
    </div>
  );
}
