import React, { useEffect } from 'react';
import {
  DatePicker,
} from '@progress/kendo-react-dateinputs';
import { Badge } from '@progress/kendo-react-indicators';
import { CustomToggleButton } from '../custom-components/CustomComponents';
import { getElectricityConsumption, getGasConsumption } from '../services/octopus-api';

export default function DailyStats({
  selectedDate,
  setSelectedDate,
  electricityData,
  setElectricityData,
  gasData,
  setGasData,
  loading,
  setLoading,
  error,
  setError
}) {
  const ELECTRICITY_MPAN = '1900004287438';
  const ELECTRICITY_SERIAL = '16K0592179';
  
  const mockGasData = {
    results: [
      { consumption: 150, interval_start: new Date().toISOString(), interval_end: new Date().toISOString() },
      { consumption: 145, interval_start: new Date(Date.now() - 30*24*60*60*1000).toISOString(), interval_end: new Date(Date.now() - 30*24*60*60*1000).toISOString() }
    ],
    count: 2
  };
  
  const ELECTRICITY_TARIFF = 0.28; 
  const GAS_TARIFF = 0.07;
  
  const fetchData = async (date) => {
    try {
      setLoading(true);
      setError(null);
      
      const selectedYear = date.getFullYear();
      const selectedMonth = date.getMonth();
      
      const periodFrom = new Date(selectedYear, selectedMonth, 1).toISOString();
      const periodTo = new Date(selectedYear, selectedMonth + 1, 0).toISOString();
      
      console.log(`Fetching data for period: ${periodFrom} to ${periodTo}`);
      
      const electricityResponse = await getElectricityConsumption(
        ELECTRICITY_MPAN, 
        ELECTRICITY_SERIAL, 
        periodFrom, 
        periodTo, 
        'day'
      );
      
      setElectricityData(electricityResponse);
      
      const updatedMockGasData = {
        results: [
          { 
            consumption: 150 + (date.getMonth() * 10), 
            interval_start: periodFrom, 
            interval_end: periodTo 
          },
          { 
            consumption: 145 + (date.getMonth() * 8), 
            interval_start: new Date(date.getFullYear(), date.getMonth() - 1, 1).toISOString(), 
            interval_end: new Date(date.getFullYear(), date.getMonth(), 0).toISOString() 
          }
        ],
        count: 2
      };
      
      setGasData(updatedMockGasData);
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
    setSelectedDate(e.value);
  };
  
  const calculateElectricityCost = () => {
    if (!electricityData || !electricityData.results || electricityData.results.length === 0) {
      return 0;
    }
    
    const latestConsumption = electricityData.results[0].consumption;
    return (latestConsumption * ELECTRICITY_TARIFF).toFixed(2);
  };
  
  const calculateGasCost = () => {
    if (!gasData || !gasData.results || gasData.results.length === 0) {
      return 0;
    }
    
    const latestConsumption = gasData.results[0].consumption;
    return (latestConsumption * GAS_TARIFF).toFixed(2);
  };
  
  const calculateTotalCost = () => {
    const electricityCost = parseFloat(calculateElectricityCost());
    const gasCost = parseFloat(calculateGasCost());
    return (electricityCost + gasCost).toFixed(2);
  };
  
  const getElectricityConsumptionValue = () => {
    if (!electricityData || !electricityData.results || electricityData.results.length === 0) {
      return 0;
    }
    return electricityData.results[0].consumption.toFixed(2);
  };
  
  const getGasConsumptionValue = () => {
    if (!gasData || !gasData.results || gasData.results.length === 0) {
      return 0;
    }
    return gasData.results[0].consumption.toFixed(2);
  };
  
  const compareWithPreviousPeriod = () => {
    if (!electricityData || !electricityData.results || electricityData.results.length < 2) {
      return { value: 0, increasing: false };
    }
    
    const current = electricityData.results[0].consumption + (gasData?.results[0]?.consumption || 0);
    const previous = electricityData.results[1].consumption + (gasData?.results[1]?.consumption || 0);
    const percentChange = ((current - previous) / previous * 100).toFixed(0);
    
    return {
      value: Math.abs(percentChange),
      increasing: current > previous
    };
  };
  
  const comparison = compareWithPreviousPeriod();
  
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
        <DatePicker
          fillMode="flat"
          value={selectedDate}
          onChange={handleDateChange}
          width={'172px'}
          toggleButton={CustomToggleButton}
          ariaLabel="datepicker"
        />
      </div>
      <div className="k-d-grid k-grid-cols-6 k-gap-5 k-gap-sm-4 k-gap-md-3 k-gap-xl-4 k-overflow-hidden">
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-error k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Electricity Cost</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                ${calculateElectricityCost()}
              </div>
              <Badge
                themeColor="error"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                {comparison.increasing ? 'Increasing' : 'Decreasing'}
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-success k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Electricity Usage</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                {getElectricityConsumptionValue()} kWh
              </div>
              <Badge
                themeColor={comparison.increasing ? 'error' : 'success'}
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                {comparison.increasing ? 'Increasing' : 'Decreasing'}
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-error k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Gas Cost</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                ${calculateGasCost()}
              </div>
              <Badge
                themeColor="error"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                {comparison.increasing ? 'Increasing' : 'Decreasing'}
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-success k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Gas Usage</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                {getGasConsumptionValue()} kWh
              </div>
              <Badge
                themeColor={comparison.increasing ? 'error' : 'success'}
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                {comparison.increasing ? 'Increasing' : 'Decreasing'}
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-error k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Total Cost</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                ${calculateTotalCost()}
              </div>
              <Badge
                themeColor="error"
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                {comparison.increasing ? 'Increasing' : 'Decreasing'}
              </Badge>
            </div>
          </div>
        </div>
        <div
          className="k-col-span-6 k-col-span-sm-3 k-col-span-md-2 k-col-span-xl-1 k-d-flex k-flex-col k-flex-basis-0 k-flex-grow k-border k-border-solid k-border-border k-overflow-hidden k-bg-surface-alt k-rounded-lg"
          style={{ background: 'var(--card-gradient)' }}
        >
          <div className="k-flex-1 k-d-flex k-flex-col k-border-0 k-border-left-4 k-border-solid k-border-success k-p-2 k-pl-3">
            <div className="k-d-flex k-flex-col k-font-size-xs k-line-height-lg">
              <div>Change vs Previous</div>
            </div>
            <div className="k-d-flex k-gap-1 k-pt-1 k-justify-content-between k-align-items-center k-flex-wrap">
              <div className="k-font-size-xl k-font-bold k-color-subtle">
                {comparison.value}%
              </div>
              <Badge
                themeColor={comparison.increasing ? 'error' : 'success'}
                size="small"
                rounded="medium"
                position={null}
                aria-label="badge"
              >
                {comparison.increasing ? 'Increasing' : 'Decreasing'}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}