import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React, { ReactNode, useState } from 'react';
import { Detail } from '../types/Detail';
import DetailsSection from './SectionDetails';

export default function SectionDetailsContainer(): ReactNode {
  const { key } = useParams<{ key: string }>();
  const [detailsIsLoading, setDetailsIsLoading]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
  ] = useState(false);

  const [shownDetail, setShownDetail]: [
    Detail | undefined,
    React.Dispatch<React.SetStateAction<Detail | undefined>>,
  ] = useState<Detail | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const [latestLoadedKey, setLatestLoadedKey] = useState<string | undefined>();

  async function loadDetails(key: string): Promise<void> {
    setShownDetail(undefined);
    setDetailsIsLoading(true);

    const request: string = 'https://openlibrary.org/works/' + key + '.json';
    const response: Detail | undefined = await fetch(request)
      .then((res: Response) => res.json())
      //TODO:: add catch action
      .catch(() => {
        return undefined;
      });

    setShownDetail(response);
    setDetailsIsLoading(false);
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
    <div className="details_section_container">
      <button className="closeDetailsBtn"> ❌ </button>
      <DetailsSection
        details={shownDetail}
        isLoading={detailsIsLoading}
        onClickOutside={unsetSelectedSectionDetails}
      />
    </div>
  );
}
