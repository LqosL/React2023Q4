import React, { ReactNode } from 'react';
import { Detail } from '../types/Detail';
import DetailsSection from './SectionDetails';
import { detailedInfo } from '../pages';

export default function SectionDetailsContainer({
  details,
}: {
  details?: detailedInfo;
}): ReactNode {
  const shownDetail: Detail | undefined = details?.details;

  // useEffect(() => {
  //   const requestIsLoading =
  //     detailsRequest.isLoading || detailsRequest.isFetching;
  //
  //   dispatcher(updateLoaderDetails(requestIsLoading));
  //
  //   if (requestIsLoading || detailsRequest.data == null) return;
  //
  //   setShownDetail(detailsRequest.data);
  //   dispatcher(updateLoaderDetails(false));
  // }, [dispatcher, detailsRequest]);

  function unsetSelectedSectionDetails() {
    // setShownDetail(undefined);
    // navigate({ pathname: '/', search: location.search });
  }

  return (
    <div role="details_section_container" className="details_section_container">
      <button
        role="closeDetailsBtn"
        className="closeDetailsBtn"
        onClick={() => {
          unsetSelectedSectionDetails();
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
