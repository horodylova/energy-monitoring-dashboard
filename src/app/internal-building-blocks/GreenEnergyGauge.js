import React, { useState, useEffect } from 'react';
import { ArcGauge } from '@progress/kendo-react-gauges';

export default function GreenEnergyGauge() {
  const [greenPercentage, setGreenPercentage] = useState(50);
  const [color, setColor] = useState('var(--kendo-color-warning)');

  useEffect(() => {
    const fetchGreenEnergy = () => {
      const simulatedPercentage = Math.floor(Math.random() * 100);
      setGreenPercentage(simulatedPercentage);
      
      if (simulatedPercentage >= 70) {
        setColor('var(--kendo-color-success)');
      } else if (simulatedPercentage >= 30 && simulatedPercentage < 70) {
        setColor('var(--kendo-color-warning)');
      } else {
        setColor('var(--kendo-color-error)');
      }
    };

    fetchGreenEnergy();
    const interval = setInterval(fetchGreenEnergy, 5000);

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
        <strong>{greenPercentage}%</strong>
      </h3>
    );
  };

  return (
    <ArcGauge
      value={greenPercentage}
      min={0}
      max={100}
      color={color}
      style={{ width: '100%', height: '132px', position: 'relative' }}
      arcCenterRender={arcCenterRenderer}
      scale={{
        rangeSize: 12
      }}
    />
  );
}