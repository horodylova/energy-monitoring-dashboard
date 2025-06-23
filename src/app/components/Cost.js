import React, { useRef } from 'react';
import {
  Button,
  ButtonGroup,
  ChipList,
} from '@progress/kendo-react-buttons';
import { exportIcon } from '@progress/kendo-svg-icons';
import { PDFExport } from '@progress/kendo-react-pdf';

import CostChart from '../internal-building-blocks/cost-chart';
import { chipData } from '../data';
import { CustomChip } from '../custom-components/CustomComponents';

export default function Cost({ onRefresh }) {
  const pdfExportRef = useRef(null);

  const handleExport = () => {
    if (pdfExportRef.current) {
      pdfExportRef.current.save();
    }
  };

  return (
    <div className="k-col-span-3 k-col-span-xl-2 k-d-flex k-flex-col k-gap-10">
      <div className="k-flex-1 k-d-flex k-flex-col">
        <h2 className="k-h5 !k-mb-5 k-color-subtle">Cost</h2>

        <PDFExport
          ref={pdfExportRef}
          paperSize="A3"
          margin="1cm"
          fileName="energy-cost-over-time.pdf"
          author="Energy Monitoring Dashboard"
          creator="Energy Monitoring Dashboard"
          landscape={true}
          scale={0.9}
        >
          <div
            className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
            style={{ background: 'var(--card-gradient)' }}
          >
            <div className="k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
              <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                Cost over time
              </span>
              <ButtonGroup>
                <Button title="minute">Minute</Button>
                <Button title="day">Day</Button>
                <Button title="month">Month</Button>
                <Button className="k-selected" title="year">
                  Year
                </Button>
                <Button title="total">Total</Button>
              </ButtonGroup>
            </div>

            <div className="k-flex-1 k-p-4 k-d-flex k-flex-col k-gap-4">
              <ChipList
                className="k-gap-2"
                data={chipData}
                chip={CustomChip}
                selection="multiple"
                ariaLabel="chiplist"
              />
              <div className="k-flex-1">
                <CostChart onRefresh={onRefresh} />
              </div>
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
    </div>
  );
}
