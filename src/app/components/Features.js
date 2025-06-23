import React, { useRef } from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { exportIcon } from '@progress/kendo-svg-icons';
import HourlyConsumptionPieChart from '../internal-building-blocks/HourlyConsumptionPieChart';
import { PDFExport } from '@progress/kendo-react-pdf';


export default function Features({ onRefresh }) {
   const pdfExportComponent = useRef(null);

  const handleExport = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };
  
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">Features</h2>
       <PDFExport
        ref={pdfExportComponent}
        paperSize="A4"
        margin="1cm"
        fileName="hourly-energy-consumption.pdf"
        author="Energy Monitoring Dashboard"
        creator="Energy Monitoring Dashboard"
        forcePageBreak=".page-break"
        keepTogether=".keep-together"
        avoidLinks={true}
        scale={1}
        landscape={false}  
      >
      <div
        className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
        style={{ background: 'var(--card-gradient)' }}
      >
        <div className="k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
          <div className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
            Hourly Energy Consumption
          </div>
        </div>
        <div className="k-flex-1 k-d-flex k-justify-content-center k-p-4" >
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
      </PDFExport>
    </div>
  );
}