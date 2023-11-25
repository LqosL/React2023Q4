import React, { ReactNode } from 'react';
import DetailsSection from './SectionDetails';

import {DetailedInfo} from "../types/DetailedInfo";

export default function SectionDetailsContainer({
  details,
  currentDetailKey,
  closeDetails
}: {
  details?: DetailedInfo;
  currentDetailKey: string|undefined;
  closeDetails: () => void;
}): ReactNode {
  if (currentDetailKey == undefined) return<></>;

    const loadingDetails:ReactNode = currentDetailKey !== details?.details?.key ? (
        <div role="details_loader" className="loader details_loader">
            ...LOADING DETAILS...
        </div>
    ):(
        <DetailsSection
            details={details?.details}
            onClickOutside={closeDetails}
        />
    )

  return (
    <div role="details_section_container" className="details_section_container">
      <button
        role="closeDetailsBtn"
        className="closeDetailsBtn"
        onClick={() => {
          closeDetails();
        }}
      >
        {' '}
        ❌{' '}
      </button>
        {loadingDetails}
    </div>
  );
}
