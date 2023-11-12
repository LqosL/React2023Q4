import React, { ReactNode, useState } from 'react';

export default function PaginationWrapper({
  itemsPerPage,
  currentPage,
  changePagination,
}: {
  itemsPerPage: string;
  currentPage: string;
  changePagination: (pageNum: string, pageSize: string) => void;
}): ReactNode {
  const [pageSize, setPageSize]: [
    pageSize: string,
    setPageSize: React.Dispatch<React.SetStateAction<string>>,
  ] = useState(itemsPerPage);

  return (
    <div className="paginWrapper">
      <div>
        <button
          role='prevBtn'
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
          role='nextBtn'
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
            type="number"
            min={5}
            max={15}
            id="sizeInput"
            defaultValue={pageSize}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPageSize(event.target.value)
            }
          />
          <button
            type={'submit'}
            onClick={() => changePagination('1', pageSize.toString())}
          >
            Apply
          </button>
        </label>
      </div>
    </div>
  );
}
