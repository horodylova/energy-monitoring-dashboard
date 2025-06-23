'use client'

import axios from 'axios';

const OCTOPUS_API_BASE_URL = 'https://api.octopus.energy';

const ACCOUNT_NUMBER = process.env.NEXT_PUBLIC_OCTOPUS_ENERGY_ACCOUNT_NUMBER;
const API_KEY = process.env.NEXT_PUBLIC_VITE_OCTOPUS_API_KEY;
const ELECTRICITY_MPAN = process.env.NEXT_PUBLIC_VITE_ELECTRICITY_MPAN;
const ELECTRICITY_SERIAL = process.env.NEXT_PUBLIC_VITE_ELECTRICITY_SERIAL;

const ACCOUNT_CREATION_DATE = new Date(2022, 9, 4);

const ELECTRICITY_TARIFF_HISTORY = [
  { startDate: new Date(2022, 9, 4), rate: 0.24 },
  { startDate: new Date(2023, 0, 1), rate: 0.26 },
  { startDate: new Date(2023, 6, 1), rate: 0.28 },
  { startDate: new Date(2024, 0, 1), rate: 0.30 },
  { startDate: new Date(2024, 6, 1), rate: 0.28 }
];

function getAccountCreationDate() {
  return ACCOUNT_CREATION_DATE;
}

function getTariffForDate(date) {
  if (date < ACCOUNT_CREATION_DATE) {
    return ELECTRICITY_TARIFF_HISTORY[0].rate;
  }
  
  let applicableTariff = ELECTRICITY_TARIFF_HISTORY[0].rate;
  
  for (const tariffPeriod of ELECTRICITY_TARIFF_HISTORY) {
    if (date >= tariffPeriod.startDate) {
      applicableTariff = tariffPeriod.rate;
    } else {
      break;
    }
  }
  
  return applicableTariff;
}

async function getAccountProperties() {
  try {
  
    
    const response = await axios.get(
      `${OCTOPUS_API_BASE_URL}/v1/accounts/${ACCOUNT_NUMBER}/`,
      {
        auth: {
          username: API_KEY,
          password: ''
        }
      }
    );
    

    return response.data;
  } catch (error) {
    throw new Error(`Account data error: ${error.response?.data?.detail || error.message}`);
  }
}

async function getElectricityConsumption(mpan, serial, periodFrom, periodTo, groupBy) {
    try {
        
        const response = await axios.get(`${OCTOPUS_API_BASE_URL}/v1/electricity-meter-points/${mpan}/meters/${serial}/consumption/`, {
            params: {
                period_from: periodFrom,
                period_to: periodTo,
                group_by: groupBy
            },
            auth: {
                username: API_KEY,
                password: ''
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching electricity consumption:', error.response ? error.response.data : error.message);
        throw new Error(`Electricity consumption error: ${error.response?.data?.detail || error.message}`);
    }
}

async function getDailyElectricityData(date) {
    try {
        const today = new Date();
        const isToday = date.getDate() === today.getDate() && 
                       date.getMonth() === today.getMonth() && 
                       date.getFullYear() === today.getFullYear();
        
        const isYesterday = date.getDate() === today.getDate() - 1 && 
                          date.getMonth() === today.getMonth() && 
                          date.getFullYear() === today.getFullYear();
  
        
        let periodFrom = new Date(date);
        periodFrom.setHours(0, 0, 0, 0);
        
        let periodTo = new Date(date);
        periodTo.setHours(23, 59, 59, 999);
        
        if (isToday || isYesterday) {
            periodFrom = new Date(today);
            periodFrom.setDate(today.getDate() - 3);
            periodFrom.setHours(0, 0, 0, 0);
            
            periodTo = new Date(today);
            periodTo.setHours(23, 59, 59, 999);
            
        }

        const electricityResponse = await getElectricityConsumption(
            ELECTRICITY_MPAN,
            ELECTRICITY_SERIAL,
            periodFrom.toISOString(),
            periodTo.toISOString(),
            'hour'
        );
        
        const selectedDateStr = date.toISOString().split('T')[0];
        
        const hourlyConsumption = electricityResponse.results.filter(item => 
            item.interval_start.startsWith(selectedDateStr)
        );
                
        let totalConsumption = 0;
        let dataStatus = 'complete';
        
        if (hourlyConsumption.length > 0) {
            totalConsumption = hourlyConsumption.reduce((sum, item) => sum + item.consumption, 0);
            
            if (isToday) {
                dataStatus = 'partial';
            } else if (isYesterday && hourlyConsumption.length < 24) {
                dataStatus = 'partial';
            }
        } else {
            if (isToday || isYesterday) {
                dataStatus = 'pending';
            } else {
                dataStatus = 'missing';
            }
        }
        
        const tariff = getTariffForDate(date);
        
        return {
            consumption: totalConsumption,
            tariff: tariff,
            cost: totalConsumption * tariff,
            dataStatus: dataStatus,
            recordCount: hourlyConsumption.length
        };
    } catch (error) {
        throw error;
    }
}

async function getMonthlyElectricityData(startYear, endYear, currentMonth) {
    try {
        
        const result = [];
        
        for (let year = startYear; year <= endYear; year++) {
            const yearData = {
                year: year,
                data: []
            };
            
            const monthLimit = (year === new Date().getFullYear()) ? new Date().getMonth() : 11;
            
            const startMonth = 0;
            
            for (let month = startMonth; month <= monthLimit; month++) {
                const startDate = new Date(year, month, 1);
                const endDate = new Date(year, month + 1, 0);
                
                const periodFrom = new Date(startDate);
                periodFrom.setHours(0, 0, 0, 0);
                
                const periodTo = new Date(endDate);
                periodTo.setHours(23, 59, 59, 999);
                
                try {
                    const electricityResponse = await getElectricityConsumption(
                        ELECTRICITY_MPAN,
                        ELECTRICITY_SERIAL,
                        periodFrom.toISOString(),
                        periodTo.toISOString(),
                        'day'
                    );
                    
                    let monthlyConsumption = 0;
                    
                    if (electricityResponse.results && electricityResponse.results.length > 0) {
                        monthlyConsumption = electricityResponse.results.reduce((sum, item) => sum + item.consumption, 0);
                    }
                    
                    yearData.data.push({
                        month: month,
                        consumption: monthlyConsumption
                    });
                } catch (error) {
                    console.error(`Error fetching data for ${year}-${month+1}:`, error);
                    
                    yearData.data.push({
                        month: month,
                        consumption: 0
                    });
                }
            }
            
            result.push(yearData);
        }
        
        return result;
    } catch (error) {
        throw error;
    }
}

export { getAccountCreationDate, getTariffForDate, getAccountProperties, getElectricityConsumption, getDailyElectricityData, getMonthlyElectricityData };