import React, { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';
import { ItemsPerPageStatePart } from '../redux/itemsPerPageSlice';

export default function PaginationWrapper({
  currentPage,
  changePagination,
}: {
  currentPage: string;
  changePagination: (pageNum: string, pageSize: string) => void;
}): ReactNode {
  const itemsPerPage: string = useSelector(
    (state: ItemsPerPageStatePart) => state.itemsPerPage.itemsPerPage
  );
  const [itemsPerPageInInput, setItemsPerPageInInput] = useState(itemsPerPage);

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
            defaultValue={itemsPerPageInInput}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setItemsPerPageInInput(event.target.value)
            }
          />
          <button
            role="page_size_submit"
            type={'submit'}
            onClick={() => changePagination('1', itemsPerPageInInput)}
          >
            Apply
          </button>
        </label>
      </div>
    </div>
  );
}
