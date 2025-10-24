import React, { useEffect, useState } from 'react';

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import {
  DatePicker,
} from '@progress/kendo-react-dateinputs';
import { Badge } from '@progress/kendo-react-indicators';
import { CustomToggleButton } from '../custom-components/CustomComponents';
import { getAccountCreationDate, getDailyElectricityData } from '../services/octopus-api';

export default function DailyStats({
  selectedDate,
  setSelectedDate,
  loading,
  setLoading,
  error,
  setError
}) {
  const [dailyData, setDailyData] = useState(null);
  
  const fetchData = async (date) => {
    try {
      setLoading(true);
      setError(null);
      
      const electricityData = await getDailyElectricityData(date);
      setDailyData(electricityData);
    } catch (err) {
      setError('Failed to load consumption data');
      console.error('Error fetching consumption data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);
  
  const handleDateChange = (e) => {
    const newDate = e.value;
    setSelectedDate(newDate);
  };
  
  const getConsumptionValue = () => {
    if (!dailyData) {
      return 0;
    }
    
    return dailyData.consumption.toFixed(2);
  };
  
  const getCurrentTariff = () => {
    if (!dailyData) {
      return 0;
    }
    
    return dailyData.tariff.toFixed(2);
  };
  
  const getElectricityCost = () => {
    if (!dailyData) {
      return 0;
    }
    
    return dailyData.cost.toFixed(2);
  };
  
  const getDataStatusMessage = () => {
    if (!dailyData || !dailyData.dataStatus) {
      return null;
    }
    
    let text = "";
    let themeColor = "";
    
    switch (dailyData.dataStatus) {
      case 'pending':
        text = "Data not yet available";
        themeColor = "info";
        break;
      case 'partial':
        text = `Partial data (${dailyData.recordCount} of 24 hours)`;
        themeColor = "warning";
        break;
      case 'missing':
        text = "Data missing";
        themeColor = "error";
        break;
      default:
        return null;
    }
    
    return (
      <span className="k-badge k-badge-md" style={{ marginRight: '8px', padding: '4px 8px', borderRadius: '4px', backgroundColor: themeColor === 'info' ? '#0058e9' : themeColor === 'warning' ? '#ff9800' : '#f31700', color: 'white', fontSize: '12px', whiteSpace: 'nowrap' }}>
        {text}
      </span>
    );
  };
  
  if (loading) {
    return <div>Loading energy data...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <div className="k-d-flex k-flex-wrap k-mb-5 k-gap-4 k-justify-content-between k-align-items-center">
        <h2 className="k-h5 !k-mb-0 k-color-subtle">Daily Stats</h2>
        <div className="k-d-flex k-align-items-center k-gap-2">
          {getDataStatusMessage()}
          <DatePicker
            fillMode="flat"
            value={selectedDate}
            onChange={handleDateChange}
            width={'172px'}
            toggleButton={CustomToggleButton}
            ariaLabel="datepicker"
            min={getAccountCreationDate()}
            max={new Date()}
          />
        </div>
      </div>
      
      <div className="k-d-grid k-grid-cols-6 k-gap-5 k-gap-sm-4 k-gap-md-3 k-gap-xl-4 k-overflow-hidden">
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-error k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Electricity Consumption (kWh)</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                {getConsumptionValue()}
              </div>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-warning k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Current Tariff (£/kWh)</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                £{getCurrentTariff()}
              </div>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-info k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Electricity Cost</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                £{getElectricityCost()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}