import { ArcGauge } from '@progress/kendo-react-gauges';

const arcCenterRenderer = () => {
  return (
    <h3
      style={{
        color: 'var(--kendo-color-error)',
        fontSize: '28px',
      }}
    >
      <strong>58%</strong>
    </h3>
  );
};

export default function DetectionGaugeError() {
  return (
    <ArcGauge
      value={58}
      color={'var(--kendo-color-error)'}
      style={{ width: '100%', height: '132px', position: 'relative' }}
      arcCenterRender={arcCenterRenderer}
      scale={{
        rangeSize: 12
      }}
    />
  );
}
