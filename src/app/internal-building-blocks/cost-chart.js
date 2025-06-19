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
} from '@progress/kendo-react-charts';
import { costChartCategories, productionVolumeData } from '../data';

export default function CostChart(props) {
  const { onRefresh } = props;
  return (
    <Chart style={{ height: '570px' }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          labels={{ format: 'MMM', rotation: -85 }}
          categories={costChartCategories}
        />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem
          labels={{ format: '${0}k' }}
          min={0}
          max={250000}
          majorUnit={25000}
        />
      </ChartValueAxis>
      <ChartSeries>
        {productionVolumeData.map((item) => {
          return (
            <ChartSeriesItem
              key={item.name}
              type="column"
              labels={{ font: '11.998px Fira Sans, sans-serif' }}
              data={item.data}
              name={item.name}
              spacing={0}
              color={item.color}
            />
          );
        })}
      </ChartSeries>
      <ChartLegend position="bottom" orientation="horizontal" align='center' offsetY={10} />
    </Chart>
  );
}