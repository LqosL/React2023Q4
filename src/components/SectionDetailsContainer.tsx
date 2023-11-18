import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import React, { ReactNode, useEffect, useState } from 'react';
import { Detail } from '../types/Detail';
import DetailsSection from './SectionDetails';
import { useDispatch, useSelector } from 'react-redux';
import { updateViewMode, ViewModeStatePart } from '../redux/viewModeSlice';
import { updateLoaderDetails } from '../redux/loaderDetailsSlice';
import { useDetailsQuery } from '../utils/api';

export default function SectionDetailsContainer(): ReactNode {
  const { key } = useParams<{ key: string }>();

  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();

  const dispatcher = useDispatch();
  const viewMode: boolean = useSelector(
    (state: ViewModeStatePart) => state.viewMode.viewMode
  );

  const [shownDetail, setShownDetail]: [
    Detail | undefined,
    React.Dispatch<React.SetStateAction<Detail | undefined>>,
  ] = useState<Detail | undefined>(undefined);
  const detailsRequest = useDetailsQuery(
    { key: key !== undefined ? key : '' },
    { skip: key === undefined }
  );

  useEffect(() => {
    const requestIsLoading =
      detailsRequest.isLoading || detailsRequest.isFetching;

    dispatcher(updateLoaderDetails(requestIsLoading));

    if (requestIsLoading || detailsRequest.data == null) return;

    setShownDetail(detailsRequest.data);
    dispatcher(updateLoaderDetails(false));
  }, [dispatcher, detailsRequest]);

  if (!viewMode) return;

  function unsetSelectedSectionDetails() {
    setShownDetail(undefined);
    navigate({ pathname: '/', search: location.search });
  }

  return (
    <div role="details_section_container" className="details_section_container">
      <button
        role="closeDetailsBtn"
        className="closeDetailsBtn"
        onClick={() => {
          dispatcher(updateViewMode(false)), unsetSelectedSectionDetails();
        }}
      >
        {' '}
        ❌{' '}
      </button>
      <DetailsSection
        details={shownDetail}
        onClickOutside={unsetSelectedSectionDetails}
      />
    </div>
  );
}
