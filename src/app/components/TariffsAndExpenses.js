import React, { useState, useRef } from 'react';
import {
  Button,
  ButtonGroup,
  ChipList,
} from '@progress/kendo-react-buttons';
import { exportIcon } from '@progress/kendo-svg-icons';
import TariffComparisonChart from '../internal-building-blocks/tariff-comparison-chart';
import HourlyConsumptionHeatmap from '../internal-building-blocks/hourly-consumption-heatmap';

import { chipData } from '../data';
import { CustomChip } from '../custom-components/CustomComponents';
import { PDFExport } from '@progress/kendo-react-pdf';

export default function TariffsAndExpenses({ onRefresh }) {
  const [selectedView, setSelectedView] = useState('comparison');
  const pdfExportRef = useRef(null);

  const renderChart = () => {
    switch (selectedView) {
      case 'comparison':
        return <TariffComparisonChart onRefresh={onRefresh} />;
      case 'hourly':
        return <HourlyConsumptionHeatmap onRefresh={onRefresh} />;
      default:
        return <TariffComparisonChart onRefresh={onRefresh} />;
    }
  };

  const handleExport = () => {
    if (pdfExportRef.current) {
      pdfExportRef.current.save();
    }
  };

  return (
    <div className="k-col-span-3 k-col-span-xl-2 k-d-flex k-flex-col k-gap-10">
      <div className="k-flex-1 k-d-flex k-flex-col">
        <h2 className="k-h5 !k-mb-5 k-color-subtle">Tariffs and Expenses</h2>

        <PDFExport
          ref={pdfExportRef}
          paperSize="A3"
          margin="1cm"
          fileName={`energy-analysis-${selectedView}.pdf`}
          author="Energy Monitoring Dashboard"
          creator="Energy Monitoring Dashboard"
          forcePageBreak=".page-break"
          landscape={true}
          scale={0.9}
        >
          <div
            className="k-flex-1 k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
            style={{ background: 'var(--card-gradient)' }}
          >
            <div className="k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
              <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
                Energy Consumption Analysis
              </span>
              <ButtonGroup>
                <Button
                  title="comparison"
                  className={selectedView === 'comparison' ? 'k-selected' : ''}
                  onClick={() => setSelectedView('comparison')}
                >
                  Tariff Comparison
                </Button>
                <Button
                  title="hourly"
                  className={selectedView === 'hourly' ? 'k-selected' : ''}
                  onClick={() => setSelectedView('hourly')}
                >
                  Hourly Consumption
                </Button>
              </ButtonGroup>
            </div>

            <div className="k-flex-1 k-p-4 k-d-flex k-flex-col k-gap-4">
              <ChipList
                data={chipData}
                chip={CustomChip}
                selection="multiple"
                ariaLabel="chiplist"
              />
              <div className="k-flex-1">
                {renderChart()}
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
