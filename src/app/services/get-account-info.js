'use client'

import { getAccountProperties } from './octopus-api';

export default function GetAccountInfo() {
  const fetchAccountInfo = async () => {
    try {
      const accountData = await getAccountProperties();
      console.log('Account Number:', accountData.number);
      
      if (accountData.properties && accountData.properties.length > 0) {
        console.log('Properties found:', accountData.properties.length);
        
        accountData.properties.forEach((property, index) => {
          console.log(`\nProperty ${index + 1}:`);
          console.log('Address:', property.address);
          
          if (property.electricity_meter_points && property.electricity_meter_points.length > 0) {
            property.electricity_meter_points.forEach((point, i) => {
              console.log(`\nElectricity Meter Point ${i + 1}:`);
              console.log('MPAN:', point.mpan);
              
              if (point.meters && point.meters.length > 0) {
                point.meters.forEach((meter, j) => {
                  console.log(`Electricity Meter ${j + 1}:`);
                  console.log('Serial Number:', meter.serial_number);
                });
              }
            });
          }
          
          if (property.gas_meter_points && property.gas_meter_points.length > 0) {
            property.gas_meter_points.forEach((point, i) => {
              console.log(`\nGas Meter Point ${i + 1}:`);
              console.log('MPRN:', point.mprn);
              
              if (point.meters && point.meters.length > 0) {
                point.meters.forEach((meter, j) => {
                  console.log(`Gas Meter ${j + 1}:`);
                  console.log('Serial Number:', meter.serial_number);
                });
              }
            });
          }
        });
      } else {
        console.log('No properties found for this account.');
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };

  return (
    <div>
      <h2>Account Information</h2>
      <button onClick={fetchAccountInfo}>Get Account Info</button>
    </div>
  );
}