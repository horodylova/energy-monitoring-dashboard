import React, { useState, useEffect } from 'react';
import {
  Chart,
  ChartArea,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartTooltip
} from '@progress/kendo-react-charts';
import { getElectricityConsumption } from '../services/octopus-api';
import { mockHourlyConsumptionData } from '../data';
import { Loader } from '@progress/kendo-react-indicators';

export default function HourlyConsumptionPieChart(props) {
  const { onRefresh } = props;
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        
        const periodFrom = startDate.toISOString();
        const periodTo = endDate.toISOString();
        
        const mpan = process.env.NEXT_PUBLIC_VITE_ELECTRICITY_MPAN;
        const serial = process.env.NEXT_PUBLIC_VITE_ELECTRICITY_SERIAL;
        
        const response = await getElectricityConsumption(mpan, serial, periodFrom, periodTo, 'hour');
        const consumptionData = response.results;
        
        if (!consumptionData || consumptionData.length === 0) {
          console.warn('No consumption data available for the selected period, using mock data');
          setChartData(mockHourlyConsumptionData);
          return;
        }
        
        const hourlyConsumption = {};
        
        for (let hour = 0; hour < 24; hour++) {
          hourlyConsumption[hour] = 0;
        }
        
        consumptionData.forEach(item => {
          const date = new Date(item.interval_start);
          const hour = date.getHours();
          
          hourlyConsumption[hour] += parseFloat(item.consumption);
        });
        
        const formattedData = Object.entries(hourlyConsumption).map(([hour, consumption]) => {
          let timeOfDay;
          if (hour >= 5 && hour < 12) {
            timeOfDay = 'Morning';
          } else if (hour >= 12 && hour < 17) {
            timeOfDay = 'Afternoon';
          } else if (hour >= 17 && hour < 22) {
            timeOfDay = 'Evening';
          } else {
            timeOfDay = 'Night';
          }
          
          return {
            hour: `${hour}:00`,
            consumption,
            timeOfDay
          };
        });
        
        const timeOfDayConsumption = {};
        formattedData.forEach(item => {
          if (!timeOfDayConsumption[item.timeOfDay]) {
            timeOfDayConsumption[item.timeOfDay] = 0;
          }
          timeOfDayConsumption[item.timeOfDay] += item.consumption;
        });
        
        const pieChartData = Object.entries(timeOfDayConsumption).map(([timeOfDay, consumption]) => {
          let color;
          switch (timeOfDay) {
            case 'Morning':
              color = 'rgb(255, 165, 0)';
              break;
            case 'Afternoon':
              color = 'rgb(255, 215, 0)';
              break;
            case 'Evening':
              color = 'rgb(70, 130, 180)';
              break;
            case 'Night':
              color = 'rgb(25, 25, 112)';
              break;
            default:
              color = 'rgb(128, 128, 128)';
          }
          
          return {
            kind: timeOfDay,
            share: consumption,
            color
          };
        });
        
        setChartData(pieChartData);
      } catch (error) {
        console.error('Error fetching electricity data:', error);
        setError(error.message || 'Failed to fetch electricity data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const tooltipRender = ({ point }) => {
    if (!point) return null;
    
    const { dataItem } = point;
    if (!dataItem) return null;
    
    const totalConsumption = chartData.reduce((sum, item) => sum + item.share, 0);
    const percentage = ((dataItem.share / totalConsumption) * 100).toFixed(1);
    
    return (
      <div>
        <p><strong>{dataItem.kind}</strong></p>
        <p>Consumption: {dataItem.share.toFixed(1)} kWh</p>
        <p>Percentage: {percentage}%</p>
      </div>
    );
  };

  if (isLoading) {
    return <div className="k-d-flex k-justify-content-center k-align-items-center" style={{ height: '331px' }}>
      <Loader size="large" type="infinite-spinner" />
    </div>;
  }

  if (error) {
    return <div className="k-d-flex k-justify-content-center k-align-items-center" style={{ height: '331px' }}>
      <div className="k-text-error">
        <p>Error loading data: {error}</p>
        <p>Please check your API credentials and try again.</p>
      </div>
    </div>;
  }

  return (
    <Chart style={{ width: '100%', height: '331px' }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartSeries>
        <ChartSeriesItem
          type="pie"
          holeSize={50}
          data={chartData}
          categoryField="kind"
          field="share"
          padding={10}
          border={{ width: 3, color: '#383A42' }}
          labels={{
            visible: true,
            position: 'center',
            content: ({ dataItem }) => {
              const totalConsumption = chartData.reduce((sum, item) => sum + item.share, 0);
              const percentage = ((dataItem.share / totalConsumption) * 100).toFixed(1);
              return `${percentage}%`;
            }
          }}
          legendItem={{ type: 'line' }}
        />
      </ChartSeries>
      <ChartLegend
        visible={true}
        position="bottom"
        align={'end'}
        labels={{ font: '400 14px Fira Sans, sans-serif' }}
      />
      <ChartTooltip render={tooltipRender} />
    </Chart>
  );
}