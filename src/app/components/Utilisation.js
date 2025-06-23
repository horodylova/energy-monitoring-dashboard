import { useState, useRef } from 'react';
import {
  Button,
  ButtonGroup,
  ChipList,
} from '@progress/kendo-react-buttons';
import { PDFExport } from '@progress/kendo-react-pdf';
import { exportIcon } from '@progress/kendo-svg-icons';

import YearlyUsageChart from '../internal-building-blocks/yearly-usage-chart';
import { chipData } from '../data';
import { CustomChip } from '../custom-components/CustomComponents';

export default function Usage({ onRefresh }) {
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedChips, setSelectedChips] = useState(['1', '5']);
  const pdfExportRef = useRef(null);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleChipSelect = (e) => {
    const chipValue = e.target.props.value;
    if (selectedChips.includes(chipValue)) {
      setSelectedChips(selectedChips.filter(value => value !== chipValue));
    } else {
      setSelectedChips([...selectedChips, chipValue]);
    }
  };

  const handleExport = () => {
    if (pdfExportRef.current) {
      pdfExportRef.current.save();
    }
  };

  return (
    <div>
      <PDFExport
        ref={pdfExportRef}
        paperSize="A4"
        margin="1cm"
        fileName={`energy-consumption-${selectedYear}.pdf`}
        title={`Energy Consumption Cost - ${selectedYear === 'all' ? 'All Years' : selectedYear}`}
        scale={0.75}
        forcePageBreak=".pdf-page-break"
      >
        <h2 className="k-h5 !k-mb-5 k-color-subtle">Utilisation</h2>
        <div
          className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2">
            <span className="k-font-size-xl k-font-weight-bold k-color-on-app-surface">
              Energy Consumption Cost
            </span>
            <ButtonGroup>
              <Button
                title="All"
                className={selectedYear === 'all' ? "k-selected" : ""}
                onClick={() => handleYearChange('all')}
              >
                All
              </Button>
              <Button
                title="2023"
                className={selectedYear === 2023 ? "k-selected" : ""}
                onClick={() => handleYearChange(2023)}
              >
                2023
              </Button>
              <Button
                title="2024"
                className={selectedYear === 2024 ? "k-selected" : ""}
                onClick={() => handleYearChange(2024)}
              >
                2024
              </Button>
              <Button
                title="2025"
                className={selectedYear === 2025 ? "k-selected" : ""}
                onClick={() => handleYearChange(2025)}
              >
                2025
              </Button>
            </ButtonGroup>
          </div>

          <div className="k-p-4">
            <ChipList
              data={chipData}
              selected={selectedChips}
              onItemClick={handleChipSelect}
              chip={CustomChip}
              size="medium"
              className="k-flex-wrap k-gap-2"
            />
          </div>

          <div className="k-flex-1 k-p-4 k-d-flex k-flex-col k-gap-4">
            <div className="k-flex-1">
              <YearlyUsageChart selectedYear={selectedYear} onRefresh={onRefresh} />
            </div>
          </div>

          <div className="k-p-2 k-d-flex k-justify-content-between">
            <Button
              svgIcon={exportIcon}
              fillMode="flat"
              title="export"
              onClick={handleExport}
              className="no-print"
            >
              Export
            </Button>
          </div>
        </div>
      </PDFExport>
    </div>
  );
}


