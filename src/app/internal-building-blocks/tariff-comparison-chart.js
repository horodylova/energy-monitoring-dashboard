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

// Import the tariff history from the API service
const ELECTRICITY_TARIFF_HISTORY = [
  { startDate: new Date(2022, 9, 4), rate: 0.24 },
  { startDate: new Date(2023, 0, 1), rate: 0.26 },
  { startDate: new Date(2023, 6, 1), rate: 0.28 },
  { startDate: new Date(2024, 0, 1), rate: 0.30 },
  { startDate: new Date(2024, 6, 1), rate: 0.28 },
  { startDate: new Date(2025, 3, 1), rate: 0.32 } // Новый тариф на апрель 2025
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
        
        // Format the tariff data for the chart
        const formattedData = ELECTRICITY_TARIFF_HISTORY.map(item => ({
          date: item.startDate,
          rate: item.rate
        }));
        
        // Sort by date
        formattedData.sort((a, b) => a.date - b.date);
        
        // Extract rates and format dates for categories
        const rates = formattedData.map(item => item.rate);
        const dateCategories = formattedData.map(item => {
          const date = new Date(item.date);
          // Используем английскую локаль для названий месяцев
          return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getFullYear()}`;
        });
        
        setTariffData(rates);
        setRawTariffData(formattedData); // Сохраняем полные данные для tooltip
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
    // Получаем индекс точки данных
    const index = point.index;
    
    // Проверяем, что индекс валидный
    if (index === undefined || index < 0 || index >= categories.length) {
      return (
        <div>
          <p><strong>Tariff information not available</strong></p>
        </div>
      );
    }
    
    // Получаем категорию (месяц и год) из массива категорий
    const category = categories[index];
    
    // Получаем значение тарифа напрямую из массива тарифов
    const rate = tariffData[index];
    
    // Проверяем, что rate существует
    if (rate === undefined || rate === null) {
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
        <p>Tariff Rate: £{rate.toFixed(2)}/kWh</p>
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