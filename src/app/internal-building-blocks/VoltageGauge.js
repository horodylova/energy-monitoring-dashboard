import React, { useState, useEffect } from 'react';
import { ArcGauge } from '@progress/kendo-react-gauges';

export default function VoltageGauge() {
  const [voltage, setVoltage] = useState(225);
  const [color, setColor] = useState('var(--kendo-color-success)');

  useEffect(() => {
    const fetchVoltage = () => {
    
      const simulatedVoltage = Math.floor(Math.random() * 30) + 210; 
      setVoltage(simulatedVoltage);

      if (simulatedVoltage >= 220 && simulatedVoltage <= 230) {
        setColor('var(--kendo-color-success)');
      } else if ((simulatedVoltage >= 215 && simulatedVoltage < 220) || (simulatedVoltage > 230 && simulatedVoltage <= 235)) {
        setColor('var(--kendo-color-warning)');
      } else {
        setColor('var(--kendo-color-error)');
      }
    };

    fetchVoltage(); 
    const interval = setInterval(fetchVoltage, 5000); 

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
        <strong>{voltage}V</strong>
      </h3>
    );
  };

  return (
    <ArcGauge
      value={voltage}
      min={200}
      max={250}
      color={color}
      style={{ width: '100%', height: '132px', position: 'relative' }}
      arcCenterRender={arcCenterRenderer}
      scale={{
        rangeSize: 12
      }}
    />
  );
}