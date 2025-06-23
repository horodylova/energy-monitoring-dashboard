import React, { useRef } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { exportIcon } from '@progress/kendo-svg-icons';

import ConsumptionCostChart from '../internal-building-blocks/consumption-cost-chart';
import { exportToPDF } from '../utils/pdfExport';

export default function TariffsAndExpenses({ onRefresh }) {
  const chartContainerRef = useRef(null);

  const handleExport = () => {
    const title = 'Energy Consumption Analysis - Cost/Consumption';
    
    exportToPDF(chartContainerRef, 'energy-analysis-cost.pdf', {
      title: title,
      background: '#333',
      color: '#fff'
    });
  };

  return (
     <div className="k-col-span-3 k-col-span-xl-2 k-d-flex k-flex-col k-gap-10">
      <div className="k-flex-1 k-d-flex k-flex-col">
        <h2 className="k-h5 !k-mb-5 k-color-subtle">Cost/Consumption</h2>
        <div
          className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
            {/* <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
              Energy Consumption Analysis
            </span> */}
        
        
      </div>
      
      <div className="tariffs-and-expenses__content">
        <div className="tariffs-and-expenses__chart" ref={chartContainerRef}>
          <ConsumptionCostChart selectedView="cost" />
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
    </div>
</div>
  );
}