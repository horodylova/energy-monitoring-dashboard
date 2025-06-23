import {
  Chart,
  ChartArea,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartValueAxis,
  ChartValueAxisItem,
  ChartTooltip,
  ChartSeriesItemTooltip
} from '@progress/kendo-react-charts';
import { costChartCategories } from '../data';
import { useEffect, useState } from 'react';
import { getMonthlyElectricityData } from '../services/octopus-api';

export default function ConsumptionCostChart(props) {
  const { onRefresh } = props;
  const [consumptionData, setConsumptionData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);
  const tariffRate = 0.28;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await getMonthlyElectricityData(2025, 2025);
        
        if (data && data.length > 0 && data[0].data) {
          const monthData = data[0].data;
          setMonthlyData(monthData);
          
          const consumption = monthData.map(item => item.consumption);
          setConsumptionData(consumption);
          
          const costs = monthData.map(item => {
            return item.consumption * tariffRate;
          });
          setCostData(costs);
        }
      } catch (error) {
        console.error('Error fetching electricity data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const tooltipRender = ({ point }) => {
    if (!point) {
      return (
        <div>
          <p><strong>Data not available</strong></p>
        </div>
      );
    }
    
    const seriesName = point.series.name;
    const monthIndex = point.categoryIndex;
    
    if (monthIndex === undefined || 
        monthIndex < 0 || 
        !costChartCategories || 
        monthIndex >= costChartCategories.length) {
      return (
        <div>
          <p><strong>Data not available</strong></p>
        </div>
      );
    }
    
    const month = costChartCategories[monthIndex].toLocaleString('en-US', { month: 'long' });
    const value = point.value;
    
    if (seriesName === "Consumption") {
      return (
        <div>
          <p><strong>{month} 2025</strong></p>
          <p>Consumption: {value.toFixed(2)} kWh</p>
        </div>
      );
    } else if (seriesName === "Cost") {
      return (
        <div>
          <p><strong>{month} 2025</strong></p>
          <p>Cost: £{value.toFixed(2)}</p>
          <p>Tariff Rate: £{tariffRate.toFixed(2)}/kWh</p>
        </div>
      );
    }
    
    return (
      <div>
        <p><strong>{month} 2025</strong></p>
        <p>{seriesName}: {value}</p>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <Chart style={{ height: '570px' }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartTooltip render={tooltipRender} />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          labels={{ format: 'MMM', rotation: -85 }}
          categories={costChartCategories}
        />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem
          labels={{ format: '{0} kWh' }}
          title={{ text: 'Consumption (kWh)' }}
          min={0}
        />
      </ChartValueAxis>
      <ChartSeries>
        <ChartSeriesItem
          type="column"
          data={consumptionData}
          name="Consumption"
          color="rgb(111, 159, 164)"
        />
        <ChartSeriesItem
          type="line"
          data={costData}
          name="Cost"
          color="rgb(181, 74, 106)"
          markers={{ visible: true }}
          style="smooth"
        />
      </ChartSeries>
      <ChartLegend position="bottom" orientation="horizontal" align='center' offsetY={10} />
    </Chart>
  );
}