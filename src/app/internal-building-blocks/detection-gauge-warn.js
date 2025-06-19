import { ArcGauge } from '@progress/kendo-react-gauges';

const arcCenterRenderer = () => {
  return (
    <h3
      style={{
        color: 'var(--kendo-color-warning)',
        fontSize: '28px',
      }}
    >
      <strong>64%</strong>
    </h3>
  );
};

export default function DetectionGaugeWarning() {
  return (
    <ArcGauge
      value={64}
      color={'var(--kendo-color-warning)'}
      style={{ width: '100%', height: '132px', position: 'relative' }}
      arcCenterRender={arcCenterRenderer}
      scale={{
        rangeSize: 12
      }}
    />
  );
}
