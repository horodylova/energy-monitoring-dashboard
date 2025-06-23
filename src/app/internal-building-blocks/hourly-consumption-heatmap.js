import {
  Chart,
  ChartArea,
  ChartSeries,
  ChartSeriesItem,
  ChartXAxis,
  ChartXAxisItem,
  ChartYAxis,
  ChartYAxisItem,
  ChartLegend,
  ChartTooltip
} from '@progress/kendo-react-charts';
import { useEffect, useState } from 'react';
import { getElectricityConsumption } from '../services/octopus-api';

export default function HourlyConsumptionHeatmap(props) {
  const { onRefresh } = props;
  const [heatmapData, setHeatmapData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        
        const hours = Array.from({ length: 24 }, (_, i) => i);
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        const mockData = [];
        
        days.forEach((day, dayIndex) => {
          hours.forEach(hour => {
            const consumption = Math.random() * 2.4 + 0.1;
            
            let adjustedConsumption = consumption;
            if (hour >= 7 && hour <= 9) {
              adjustedConsumption *= 1.5;
            } else if (hour >= 17 && hour <= 21) {
              adjustedConsumption *= 1.8;
            } else if (hour >= 23 || hour <= 5) {
              adjustedConsumption *= 0.5;
            }
            
            mockData.push({
              hour,
              day,
              dayIndex,
              value: adjustedConsumption.toFixed(2)
            });
          });
        });
        
        setHeatmapData(mockData);
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
          <p><strong>Consumption information not available</strong></p>
        </div>
      );
    }
    
    const dataItem = point.dataItem;
    
    if (!dataItem) {
      return (
        <div>
          <p><strong>Consumption information not available</strong></p>
        </div>
      );
    }
    
    const hour = dataItem.hour;
    const day = dataItem.day;
    const value = dataItem.value;
    
    return (
      <div>
        <p><strong>{day}, {hour}:00</strong></p>
        <p>Consumption: {value} kWh</p>
      </div>
    );
  };

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <Chart style={{ height: '570px' }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartSeries>
        <ChartSeriesItem
          type="heatmap"
          data={heatmapData}
          xField="hour"
          yField="dayIndex"
          valueField="value"
          name="Consumption (kWh)"
          colors={["#e6f2ff", "#80bfff", "#0e5a7e"]}
          labels={{
            visible: false
          }}
        />
      </ChartSeries>
      <ChartXAxis>
        <ChartXAxisItem
          title={{ text: 'Hour of Day' }}
          labels={{
            rotation: 0,
            format: '{0}:00'
          }}
        />
      </ChartXAxis>
      <ChartYAxis>
        <ChartYAxisItem
          title={{ text: 'Day of Week' }}
          labels={{
            content: (e) => {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              return days[e.value];
            }
          }}
        />
      </ChartYAxis>
      <ChartLegend position="bottom" />
      <ChartTooltip render={tooltipRender} />
    </Chart>
  );
}