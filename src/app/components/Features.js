import React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';
import { exportIcon } from '@progress/kendo-svg-icons';
import FeaturesChart from '../internal-building-blocks/features-chart';

export default function Features({ onRefresh }) {
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">Features</h2>
      <div
        className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
        style={{ background: 'var(--card-gradient)' }}
      >
        <div className="k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
          <div className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
            Top Features Used
          </div>
          <DropDownList
            data={[
              'Text generation',
              'Image generation',
              'Music and audio creation',
            ]}
            fillMode={'flat'}
            value="Generative AI"
            style={{
              width: '225px',
            }}
            ariaLabel="Select Top Features Used"
          />
        </div>
        <div className="k-flex-1 k-d-flex k-justify-content-center k-p-4">
          {/* chart */}
          <FeaturesChart onRefresh={onRefresh} />
        </div>
        <div className="k-p-2">
          <Button
            svgIcon={exportIcon}
            fillMode="flat"
            title="btn"
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}