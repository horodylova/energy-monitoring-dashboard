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
import { categories, deepLearningModelsData, generativeModelsData, nLPModelsData } from '../data';

export default function UsageChart(props) {
  const { onRefresh } = props;
  return (
    <Chart style={{ height: 429 }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartCategoryAxis>
        <ChartCategoryAxisItem
          labels={{ position: 'start', rotation: -90 }}
          categories={categories}
        />
      </ChartCategoryAxis>

        <ChartValueAxis>
          <ChartValueAxisItem
            labels={{ format: '{0}%' }}
            min={0}
            max={100}
            majorUnit={10}
          />
        </ChartValueAxis>
      <ChartSeries>
        <ChartSeriesItem
          name={'Deep Learning Models'}
          stack={{
            group: 'a',
          }}
          type="column"
          gap={0.1}
          data={deepLearningModelsData}
        />
        <ChartSeriesItem
          name={'Natural Language Processing(NLP) Models'}
          type="column"
          gap={0.1}
          data={nLPModelsData}
        />
        <ChartSeriesItem
          name={'Generative Models'}
          type="column"
          gap={0.1}
          data={generativeModelsData}
        />
      </ChartSeries>
      <ChartLegend position="bottom" />
    </Chart>
  );
}
