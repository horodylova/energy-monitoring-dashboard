import { useEffect, useState } from 'react';
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
} from '@progress/kendo-react-charts';
import { getMonthlyElectricityData, getTariffForDate } from '../services/octopus-api';

export default function YearlyUsageChart(props) {
  const { onRefresh, selectedYear = 'all' } = props;
  const [loading, setLoading] = useState(true);
  const [yearlyData, setYearlyData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [visibleSeries, setVisibleSeries] = useState({2023: true, 2024: true, 2025: true});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        
        const data = await getMonthlyElectricityData(2023, currentYear, currentMonth);
        
        const dataWithCost = data.map(yearData => {
          return {
            ...yearData,
            data: yearData.data.map(monthData => {
              const date = new Date(yearData.year, monthData.month, 1);
              const tariff = getTariffForDate(date);
              return {
                ...monthData,
                tariff: tariff,
                cost: monthData.consumption * tariff
              };
            })
          };
        });
        
        const completeData = dataWithCost.map(yearData => {
          const completeMonths = Array(12).fill(0).map((_, index) => {
            const existingData = yearData.data.find(m => m.month === index);
            if (existingData) {
              return existingData;
            }
            return {
              month: index,
              consumption: 0,
              tariff: getTariffForDate(new Date(yearData.year, index, 1)),
              cost: 0
            };
          });
          
          return {
            ...yearData,
            data: completeMonths
          };
        });
        
        setYearlyData(completeData);
        
        const monthNames = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        setCategories(monthNames);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); 
  
  const handleLegendItemClick = (e) => {
    const seriesName = parseInt(e.series.name);
    setVisibleSeries(prev => ({
      ...prev,
      [seriesName]: !prev[seriesName]
    }));
  };
  
  const tooltipRender = ({ point }) => {
    if (!point || !point.series) {
      return null;
    }
    
    const year = point.series.name;
    const monthIndex = point.categoryIndex;
    const monthName = categories[monthIndex];
    
    const yearData = yearlyData.find(data => data.year.toString() === year);
    if (!yearData) return null;
    
    const monthData = yearData.data[monthIndex];
    
    return (
      <div style={{ padding: '10px' }}>
        <div><strong>{monthName} {year}</strong></div>
        <div>Cost: £{monthData.cost.toFixed(2)}</div>
        <div>Consumption: {monthData.consumption.toFixed(2)} kWh</div>
        <div>Tariff: £{monthData.tariff.toFixed(4)}/kWh</div>
      </div>
    );
  };
  
  if (loading) {
    return <div>Loading data...</div>;
  }
  
  const filteredData = selectedYear === 'all' 
    ? yearlyData 
    : yearlyData.filter(yearData => yearData.year === selectedYear);
  
  const seriesData = filteredData.map(yearData => ({
    name: `${yearData.year}`,
    data: Array(12).fill(0).map((_, monthIndex) => {
      const monthData = yearData.data.find(m => m.month === monthIndex);
      return monthData ? monthData.cost : 0;
    }),
    color: yearData.year === 2023 ? 'rgb(181, 74, 106)' : 
           yearData.year === 2024 ? 'rgb(111, 159, 164)' : 'rgb(169, 120, 45)',
    visible: visibleSeries[yearData.year]
  }));
  
  return (
    <Chart style={{ height: '570px' }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          labels={{ rotation: 0 }}
          categories={categories}
        />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem
          labels={{ format: '£{0}' }}
          title={{ text: 'Monthly Cost (£)' }}
        />
      </ChartValueAxis>
      <ChartSeries>
        {seriesData.map(series => (
          <ChartSeriesItem
            key={series.name}
            name={series.name}
            type="column"
            gap={0.1}
            spacing={0.1}
            data={series.data}
            color={series.color}
            visible={series.visible}
          />
        ))}
      </ChartSeries>
      <ChartTooltip render={tooltipRender} />
      <ChartLegend position="bottom" onClick={handleLegendItemClick} />
    </Chart>
  );
}