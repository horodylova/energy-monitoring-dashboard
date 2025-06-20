
import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  ChipList,
} from '@progress/kendo-react-buttons';
import { exportIcon } from '@progress/kendo-svg-icons';
import YearlyUsageChart from '../internal-building-blocks/yearly-usage-chart';
import { chipData } from '../data';
import { CustomChip } from '../custom-components/CustomComponents';

export default function Usage({ onRefresh }) {
  const [selectedYear, setSelectedYear] = useState('all');
  
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
  
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">Usage</h2>
      <div
        className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg"
        style={{ background: 'var(--card-gradient)' }}
      >
        <div className="k-p-4 k-d-flex k-justify-content-between k-flex-wrap k-gap-2 k-p-4">
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
        <div className="k-flex-1 k-p-4 k-d-flex k-flex-col k-gap-4">
          <div className="k-flex-1">
            <YearlyUsageChart selectedYear={selectedYear} onRefresh={onRefresh} />
          </div>
        </div>
        <div className="k-p-2">
          <Button svgIcon={exportIcon} fillMode="flat" title="export">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}