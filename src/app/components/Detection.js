import React from 'react';
import {
  DatePicker,
} from '@progress/kendo-react-dateinputs';
import {
  Button,
} from '@progress/kendo-react-buttons';
import DetectionGaugeSuccess from '../internal-building-blocks/detection-gauge-succs';
import DetectionGaugeWarning from '../internal-building-blocks/detection-gauge-warn';
import DetectionGaugeError from '../internal-building-blocks/detection-gauge-err';
import { CustomToggleButton } from '../custom-components/CustomComponents';

export default function Detection() {
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">
        Content detection
      </h2>
      <div className="k-d-grid k-grid-cols-3 k-gap-4">
        {/* DASHBRDCARD-12 Start */}
        <div
          className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
            <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
              Accuracy
            </span>
            <DatePicker
              fillMode="flat"
              value={new Date('6/14/2023')}
              width={164}
              ariaLabel='Select Accuracy Date'
              toggleButton={CustomToggleButton}
              title="Date"
            />
          </div>
          <div className="k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
            <div className="k-d-flex k-justify-content-center">
              {/* gauge */}
              <DetectionGaugeSuccess />
            </div>
            <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
              <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                <span className="k-font-weight-bold">112k</span>
                <span className="k-text-right">
                  correct predictions
                </span>
              </div>
              <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">112k</span>
                <span>
                  correct predictions
                </span>
              </div>
              <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
              <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
              <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">3.5m</span>
                <span>all predictions made</span>
              </div>
            </div>
          </div>
          <div className="k-p-2">
            <Button fillMode="flat" title="view">
              View details
            </Button>
          </div>
        </div>
        <div
          className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-p-4 k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
            <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
              Precision
            </span>
            <DatePicker
              fillMode="flat"
              value={new Date('6/14/2023')}
              width={164}
              ariaLabel='Select Precision Date'
              toggleButton={CustomToggleButton}
              title="datepicker"
            />
          </div>
          <div className="k-p-4 k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
            <div className="k-d-flex k-justify-content-center">
              {/* gauge */}
              <DetectionGaugeWarning />
            </div>
            <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
              <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                <span className="k-font-weight-bold">112k</span>
                <span className="k-text-right">
                  true positives
                </span>
              </div>
              <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">112k</span>
                <span>
                  true positives
                </span>
              </div>
              <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
              <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
              <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">3.5m</span>
                <span>positives (true + false)</span>
              </div>
            </div>
          </div>
          <div className="k-p-2">
            <Button fillMode="flat" title="details">
              View details
            </Button>
          </div>
        </div>
        <div
          className="k-col-span-3 k-col-span-md-1 k-col-span-xl-3 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-overflow-x-auto k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-d-flex k-flex-wrap k-align-items-center k-justify-content-between k-p-4">
            <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
              Recall
            </span>
            <DatePicker
              fillMode="flat"
              value={new Date('6/14/2023')}
              width={164}
              ariaLabel='Select Recall Date'
              toggleButton={CustomToggleButton}
              title="datepicker"
            />
          </div>
          <div className="k-flex-1 k-d-flex k-flex-col k-gap-8 k-p-4">
            <div className="k-d-flex k-justify-content-center">
              {/* gauge */}
              <DetectionGaugeError />
            </div>
            <div className="k-d-flex k-gap-2 k-flex-row k-flex-md-col k-flex-xl-row">
              <div className="k-d-flex k-d-md-none k-d-xl-flex k-flex-1 k-flex-column k-align-items-end k-color-subtle">
                <span className="k-font-weight-bold">112k</span>
                <span className="k-text-right">
                  true positives
                </span>
              </div>
              <div className="k-d-none k-d-md-flex k-d-xl-none k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">112k</span>
                <span>true positives</span>
              </div>
              <span className="k-d-md-none k-d-xl-block k-separator k-separator-vertical k-border-border k-h-8 k-m-auto"></span>
              <span className="k-d-none k-d-md-block k-d-xl-none k-separator k-separator-horizontal k-border-border"></span>
              <div className="k-d-flex k-flex-1 k-flex-column k-align-items-start k-color-subtle">
                <span className="k-font-weight-bold">3.5m</span>
                <span style={{ wordWrap: 'break-word' }}>
                  true positives + false negatives
                </span>
              </div>
            </div>
          </div>
          <div className="k-p-2">
            <Button fillMode="flat" title="label">
              View details
            </Button>
          </div>
        </div>
        {/* DASHBRDCARD-12 End */}
      </div>
    </div>
  );
}