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
import { defectRateData, defectRateXAxisCategories } from '../data';

export default function RequestChart(props) {
  const { onRefresh } = props;
  return (
    <Chart style={{ width: '100%', height: '563px' }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartSeries >
        {defectRateData.map((series) => {
          return (
            <ChartSeriesItem
              key={series.name}
              type="line"
              name={series.name}
              data={series.data}
              color={series.color}
              spacing={0}
              legendItem={{ type: 'line' }}
              markers={{
                background: 'var(--kendo-color-surface-alt)',
              }}
            />
          );
        })}
      </ChartSeries>
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          baseUnit="hours"
          categories={defectRateXAxisCategories}
          labels={{ rotation: -90 }}
        />
      </ChartCategoryAxis>
      <ChartValueAxis>
        <ChartValueAxisItem
          min={0}
          max={1000}
          majorUnit={100}
          labels={{ font: '11.998px Fira Sans, sans-serif' }}
        />
      </ChartValueAxis>
      <ChartLegend position="bottom"  offsetY={10}/>
    </Chart>
  );
}
