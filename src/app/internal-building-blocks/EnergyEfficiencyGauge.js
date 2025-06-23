import React, { useState, useEffect } from 'react';
import { ArcGauge } from '@progress/kendo-react-gauges';

export default function EnergyEfficiencyGauge() {
  const [efficiency, setEfficiency] = useState(85);
  const [color, setColor] = useState('var(--kendo-color-success)');

  useEffect(() => {
    const fetchEfficiency = () => {
      const simulatedEfficiency = Math.floor(Math.random() * 40) + 70;
      setEfficiency(simulatedEfficiency);
      
      if (simulatedEfficiency >= 115) {
        setColor('var(--kendo-color-success)');
      } else if (simulatedEfficiency >= 85 && simulatedEfficiency < 115) {
        setColor('var(--kendo-color-warning)');
      } else {
        setColor('var(--kendo-color-error)');
      }
    };

    fetchEfficiency();
    const interval = setInterval(fetchEfficiency, 5000);

    return () => clearInterval(interval);
  }, []);

  const arcCenterRenderer = () => {
    return (
      <h3
        style={{
          color: color,
          fontSize: '28px',
        }}
      >
        <strong>{efficiency}%</strong>
      </h3>
    );
  };

  return (
    <ArcGauge
      value={efficiency}
      min={70}
      max={130}
      color={color}
      style={{ width: '100%', height: '132px', position: 'relative' }}
      arcCenterRender={arcCenterRenderer}
      scale={{
        rangeSize: 12
      }}
    />
  );
}