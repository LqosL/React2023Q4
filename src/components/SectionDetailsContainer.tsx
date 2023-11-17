import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import React, { ReactNode, useState } from 'react';
import { Detail } from '../types/Detail';
import DetailsSection from './SectionDetails';
import { useDispatch, useSelector } from 'react-redux';
import { updateViewMode, ViewModeStatePart } from '../redux/viewModeSlice';
import { updateLoaderDetails } from '../redux/loaderDetailsSlice';

export default function SectionDetailsContainer(): ReactNode {
  const { key } = useParams<{ key: string }>();
  // const [detailsIsLoading, setDetailsIsLoading]: [
  //   boolean,
  //   React.Dispatch<React.SetStateAction<boolean>>,
  // ] = useState(false);

  const [shownDetail, setShownDetail]: [
    Detail | undefined,
    React.Dispatch<React.SetStateAction<Detail | undefined>>,
  ] = useState<Detail | undefined>(undefined);
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const [latestLoadedKey, setLatestLoadedKey] = useState<string | undefined>();

  const dispatcher = useDispatch();
  const viewMode: boolean = useSelector(
    (state: ViewModeStatePart) => state.viewMode.viewMode
  );

  if (!viewMode) return;

  async function loadDetails(key: string): Promise<void> {
    setShownDetail(undefined);
    // setDetailsIsLoading(true);
    dispatcher(updateLoaderDetails(true));

    const request: string = 'https://openlibrary.org/works/' + key + '.json';
    const response: Detail | undefined = await fetch(request)
      .then((res: Response) => res.json())
      .catch(() => {
        return undefined;
      });

    setShownDetail(response);
    dispatcher(updateLoaderDetails(false));
    // setDetailsIsLoading(false);
  }

  function unsetSelectedSectionDetails() {
    setShownDetail(undefined);
    navigate({ pathname: '/', search: location.search });
  }

  if (latestLoadedKey != key) {
    setLatestLoadedKey(key);
    if (key) {
      loadDetails(key);
    }
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
