import React, { ReactNode, useRef} from 'react';
import { Detail } from '../types/Detail';
import DoOnClickOutside from '../utils/DoOnClickOutside';

export default function DetailsSection({
  isLoading,
  details,
  onClickOutside,
}: {
  isLoading: boolean;
  details: Detail;
  onClickOutside: () => void;
}): ReactNode {
  const loadingDetails: ReactNode = isLoading ? (
    <div className="loader">...LOADING...</div>
  ) : (
    <></>
  );

  function showDetails(details: Detail): ReactNode {
    if (Object.keys(details).length === 0) {
      return (
        <div className="details_list empty_list">
          We are terribly sorry, but nothing was found
        </div>
      );
    }

    const bookLink = 'https://openlibrary.org' + details.key;
    const authorLink = details.authors
      ? 'https://openlibrary.org' + details.authors[0].author.key
      : undefined;
    return (
      <div className="details_list">
        <div className="details_unit">
          <span className="details_key"> Title: </span>
          <span className="detailsValue"> {details.title}</span>
        </div>
        <div className="details_unit">
          <span className="details_key"> Description: </span>
          <span className="detailsValue">
            {' '}
            {details.description?.value || 'None yet'}
          </span>
        </div>
        <div className="details_unit">
          <span className="details_key"> Subjects: </span>
          <span className="detailsValue">
            {' '}
            {details.subjects ? details.subjects.join(',') : 'Unknown yet'}
          </span>
        </div>
        <div className="details_unit">
          <span className="details_key"> Open Library Book link: </span>
          <a className="detailsValue" href={bookLink}>
            {' '}
            {bookLink}{' '}
          </a>
        </div>
        <div className="details_unit">
          <span className="details_key"> Open Library Author link: </span>
          {authorLink ? (
            <a className="detailsValue" href={authorLink}>
              {' '}
              {authorLink}{' '}
            </a>
          ) : (
            <span> None yet</span>
          )}
        </div>
      </div>
    );
  }

  const ref = useRef<HTMLDivElement>(null);

  DoOnClickOutside(ref, onClickOutside);

  return (
    <div className="details_list_wrapper" ref={ref}>
      {loadingDetails}
      {showDetails(details)}
    </div>
  );
}
