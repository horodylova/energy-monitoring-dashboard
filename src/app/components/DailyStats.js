import React from 'react';
import {
  DatePicker,
} from '@progress/kendo-react-dateinputs';
import { Badge } from '@progress/kendo-react-indicators';
import { CustomToggleButton } from '../custom-components/CustomComponents';

export default function DailyStats() {
  return (
    <div>
      <div className="k-d-flex k-flex-wrap k-mb-5 k-gap-4 k-justify-content-between k-align-items-center">
        <h2 className="k-h5 !k-mb-0 k-color-subtle">Daily Stats</h2>
        <DatePicker
          fillMode="flat"
          value={new Date('1/21/2021')}
          width={'172px'}
          toggleButton={CustomToggleButton}
          ariaLabel="datepicker"
        />
      </div>
      <div className="k-d-grid k-grid-cols-6 k-gap-5 k-gap-sm-4 k-gap-md-3 k-gap-xl-4 k-overflow-hidden">
        {/* CMPCTCARD-9 Start */}
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-error k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Cost</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                $0.23
              </div>
              <Badge
                themeColor="error"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                Decreasing
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-success k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Request</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                $238
              </div>
              <Badge
                themeColor="success"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                Increasing
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-error k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Context Tokens</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                85 430
              </div>
              <Badge
                themeColor="error"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                Decreasing
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-success k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Generated Tokens</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                6 610
              </div>
              <Badge
                themeColor="success"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                Increasing
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-error k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Precision Value</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                78%
              </div>
              <Badge
                themeColor="error"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                Decreasing
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-success k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Predictions</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                8 549
              </div>
              <Badge
                themeColor="success"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                Increasing
              </Badge>
            </div>
          </div>
        </div>
        {/* CMPCTCARD-2 End */}
      </div>
    </div>
  );
}