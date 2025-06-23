import React, { useRef } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { exportIcon } from '@progress/kendo-svg-icons';
import HourlyConsumptionPieChart from '../internal-building-blocks/HourlyConsumptionPieChart';
import { exportToPDF } from '../utils/pdfExport';

export default function Features({ onRefresh }) {
  const chartContainerRef = useRef(null);
  
  const handleExport = () => {
    const title = 'Hourly Energy Consumption';
    
    exportToPDF(chartContainerRef, 'hourly-energy-consumption.pdf', {
      title: title,
      background: '#333',
      color: '#fff'
    });
  };
  
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">Features</h2>
      <div
        className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
        style={{ background: 'var(--card-gradient)' }}
      >
        <div className="k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
          <div className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
            Hourly Energy Consumption
          </div>
        </div>
        <div className="k-flex-1 k-d-flex k-justify-content-center k-p-4" ref={chartContainerRef}>
          <HourlyConsumptionPieChart onRefresh={onRefresh} />
        </div>
        <div className="k-p-2">
          <Button
            svgIcon={exportIcon}
            fillMode="flat"
            title="export"
            onClick={handleExport}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}