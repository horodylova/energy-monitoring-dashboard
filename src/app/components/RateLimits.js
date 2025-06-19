import React from 'react';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { Button } from '@progress/kendo-react-buttons';
import RateLimitsGrid from '../internal-building-blocks/rate-limits-grid';
import { CustomToggleButton } from '../custom-components/CustomComponents';

export default function RateLimits() {
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">Rate Limits</h2>
      <div
        className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
        style={{ background: 'var(--card-gradient)' }}
      >
        <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-align-items-center">
          <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
            Rate limits
          </span>
          <DatePicker
            value={new Date('6/14/2023')}
            fillMode="flat"
            width={164}
            ariaLabel='Select Rate limits Date'
            toggleButton={CustomToggleButton}
            title="datepicker"
          />
        </div>
        <div className="k-p-4 k-flex-1">
          <RateLimitsGrid />
        </div>
        <div className="k-p-2">
          <Button fillMode="flat" title="all">
            View all
          </Button>
        </div>
      </div>
    </div>
  );
}