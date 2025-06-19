import { ArcGauge } from '@progress/kendo-react-gauges';

const arcCenterRenderer = () => {
  return (
    <h3
      style={{
        color: 'var(--kendo-color-success)',
        fontSize: '28px',
      }}
    >
      <strong>87%</strong>
    </h3>
  );
};

export default function DetectionGauge() {
  return (
    <ArcGauge
      value={87}
      color={'var(--kendo-color-success)'}
      style={{ width: '100%', height: '132px', position: 'relative' }}
      arcCenterRender={arcCenterRenderer}
      scale={{
        rangeSize: 12
      }}
    />
  );
}
