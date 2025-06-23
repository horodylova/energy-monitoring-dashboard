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
  ChartTooltip
} from '@progress/kendo-react-charts';
import { useEffect, useState } from 'react';


const ELECTRICITY_TARIFF_HISTORY = [
  { startDate: new Date(2022, 9, 4), rate: 0.24 },
  { startDate: new Date(2023, 0, 1), rate: 0.26 },
  { startDate: new Date(2023, 6, 1), rate: 0.28 },
  { startDate: new Date(2024, 0, 1), rate: 0.30 },
  { startDate: new Date(2024, 6, 1), rate: 0.28 },
  { startDate: new Date(2025, 3, 1), rate: 0.28 } 
];

export default function TariffComparisonChart(props) {
  const { onRefresh } = props;
  const [tariffData, setTariffData] = useState([]);
  const [rawTariffData, setRawTariffData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepareTariffData = () => {
      try {
        setIsLoading(true);
        
        const formattedData = ELECTRICITY_TARIFF_HISTORY.map(item => ({
          date: item.startDate,
          rate: item.rate
        }));
        
      
        formattedData.sort((a, b) => a.date - b.date);
        
        const rates = formattedData.map(item => item.rate);
        const dateCategories = formattedData.map(item => {
          const date = new Date(item.date);
        
          return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
        });
        
        setTariffData(rates);
        setRawTariffData(formattedData); 
        setCategories(dateCategories);
      } catch (error) {
        console.error('Error preparing tariff data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    prepareTariffData();
  }, []);

  const tooltipRender = ({ point }) => {
    if (!point) {
      return (
        <div>
          <p><strong>Tariff information not available</strong></p>
        </div>
      );
    }
    
    const category = point.category;
    const value = point.value;
    
    if (value === undefined || value === null) {
      return (
        <div>
          <p><strong>{category}</strong></p>
          <p>Tariff information not available</p>
        </div>
      );
    }
    
    return (
      <div>
        <p><strong>{category}</strong></p>
        <p>Tariff Rate: £{value.toFixed(2)}/kWh</p>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <Chart style={{ height: '570px' }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          labels={{ rotation: -45 }}
          categories={categories}
        />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem
          labels={{ format: '£{0}' }}
          title={{ text: 'Rate per kWh (£)' }}
          min={0}
        />
      </ChartValueAxis>
      <ChartSeries>
        <ChartSeriesItem
          type="column"
          data={tariffData}
          name="Electricity Rate"
          color="rgb(0, 150, 136)"
        />
      </ChartSeries>
      <ChartLegend position="bottom" />
      <ChartTooltip render={tooltipRender} />
    </Chart>
  );
}