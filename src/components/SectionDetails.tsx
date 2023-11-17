import React, { ReactNode } from 'react';
import { Detail } from '../types/Detail';
import { useDispatch, useSelector } from 'react-redux';
import { updateViewMode } from '../redux/viewModeSlice';
import { LoaderDetailsStatePart } from '../redux/loaderDetailsSlice';

export default function DetailsSection({
  details,
}: {
  details?: Detail;
  onClickOutside: () => void;
}): ReactNode {
  const loaderDetails: boolean = useSelector(
    (state: LoaderDetailsStatePart) => state.loaderDetails.loaderDetails
  );
  const loadingDetails: ReactNode = loaderDetails ? (
    <div role="details_loader" className="loader details_loader">
      ...LOADING DETAILS...
    </div>
  ) : (
    <></>
  );

  const dispatcher = useDispatch();

  function showDetails(details: Detail): ReactNode {
    dispatcher(updateViewMode(true));
    if (Object.keys(details).length === 0) {
      return (
        <div role="details_list" className="details_list empty_list">
          We are terribly sorry, but nothing was found
        </div>
      );
    }

    const bookLink: string = 'https://openlibrary.org' + details.key;
    const authorLink: string | undefined = details.authors
      ? 'https://openlibrary.org' + details.authors[0].author.key
      : undefined;
    return (
      <div role="details_list" className="details_list">
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

  return (
    <div className="details_list_wrapper">
      {loadingDetails}
      {details ? showDetails(details) : <></>}
    </div>
  );
}
