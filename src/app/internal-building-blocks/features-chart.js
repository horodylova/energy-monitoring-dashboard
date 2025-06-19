import {
  Chart,
  ChartArea,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
} from '@progress/kendo-react-charts';
import { features } from '../data';

export default function FeaturesChart(props) {
  const { onRefresh } = props;
  return (
    <Chart style={{ width: '100%', height: '331px' }} onRefresh={onRefresh}>
      <ChartArea background="transparent" />
      <ChartSeries>
        <ChartSeriesItem
          type="pie"
          holeSize={50}
          data={features}
          categoryField="kind"
          field="share"
          padding={10}
          border={{ width: 3, color: '#383A42' }}
          labels={{ visible: true, position: 'center' }}
          legendItem={{ type: 'line' }}
        />
      </ChartSeries>
      <ChartLegend
        visible={true}
        position="bottom"
        align={'end'}
        labels={{ font: '400 14px Fira Sans, sans-serif' }}
      />
    </Chart>
  );
}
