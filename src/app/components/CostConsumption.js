import React, { useRef } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { PDFExport } from '@progress/kendo-react-pdf';
import { exportIcon } from '@progress/kendo-svg-icons';

import ConsumptionCostChart from '../internal-building-blocks/consumption-cost-chart';

export default function TariffsAndExpenses({ onRefresh }) {
  const pdfExportRef = useRef(null);

  const handleExport = () => {
    if (pdfExportRef.current) {
      pdfExportRef.current.save();
    }
  };

  return (
    <div className="k-col-span-3 k-col-span-xl-2 k-d-flex k-flex-col k-gap-10">
      <PDFExport
        paperSize="A4"
        margin="1cm"
        fileName="energy-analysis-cost.pdf"
        title="Energy Consumption Analysis - Cost/Consumption"
        ref={pdfExportRef}
        forcePageBreak=".page-break"
        scale={0.75}
        avoidLinks={true}
      >
        <div className="k-flex-1 k-d-flex k-flex-col">
          <h2 className="k-h5 !k-mb-5 k-color-subtle">Cost/Consumption</h2>

          <div className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
               style={{ background: 'var(--card-gradient)' }}>
            
            <div className="k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
              <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                Energy Consumption Analysis - Cost/Consumption
              </span>
            </div>

            <div className="k-flex-1 k-p-4 k-d-flex k-flex-col k-gap-4">
              <div className="k-flex-1">
                <ConsumptionCostChart selectedView="cost" />
              </div>
            </div>

            <div className="k-p-2 no-print">
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
      </PDFExport>
    </div>
  );
}
