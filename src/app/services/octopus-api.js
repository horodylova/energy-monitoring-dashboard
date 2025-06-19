'use client'

import axios from 'axios';

const OCTOPUS_API_BASE_URL = 'https://api.octopus.energy';
const ACCOUNT_NUMBER = process.env.NEXT_PUBLIC_OCTOPUS_ENERGY_ACCOUNT_NUMBER || 'A-C733EB22';
const API_KEY = process.env.NEXT_PUBLIC_OCTOPUS_API_KEY || 'sk_live_0qGP7EUThqnNAkVNfK3pwWBqvtaxjTGJ';

export const getAccountProperties = async () => {
  try {
    console.log('Making request to Octopus Energy API...');
    console.log('Account Number:', ACCOUNT_NUMBER);
    
    const response = await axios.get(
      `${OCTOPUS_API_BASE_URL}/v1/accounts/${ACCOUNT_NUMBER}/`,
      {
        auth: {
          username: API_KEY,
          password: ''
        }
      }
    );
    
    console.log('Data received successfully:');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching account data:', error.response ? error.response.data : error.message);
    throw new Error(`Account data error: ${error.response?.data?.detail || error.message}`);
  }
};

export const getElectricityConsumption = async (mpan, serialNumber, periodFrom, periodTo, groupBy = 'month') => {
  try {
    if (!mpan || !serialNumber) {
      throw new Error('Missing required parameters: MPAN or Serial Number');
    }
    
    const response = await axios.get(
      `${OCTOPUS_API_BASE_URL}/v1/electricity-meter-points/${mpan}/meters/${serialNumber}/consumption/`,
      {
        params: {
          period_from: periodFrom,
          period_to: periodTo,
          group_by: groupBy,
          page_size: 100
        },
        auth: {
          username: API_KEY,
          password: ''
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching electricity consumption:', error.response ? error.response.data : error.message);
    throw new Error(`Electricity data error: ${error.response?.data?.detail || error.message}`);
  }
};

export const getGasConsumption = async (mprn, serialNumber, periodFrom, periodTo, groupBy = 'month') => {
  try {
    if (!mprn || !serialNumber) {
      throw new Error('Missing required parameters: MPRN or Serial Number');
    }
    
    const response = await axios.get(
      `${OCTOPUS_API_BASE_URL}/v1/gas-meter-points/${mprn}/meters/${serialNumber}/consumption/`,
      {
        params: {
          period_from: periodFrom,
          period_to: periodTo,
          group_by: groupBy,
          page_size: 100
        },
        auth: {
          username: API_KEY,
          password: ''
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching gas consumption:', error.response ? error.response.data : error.message);
    throw new Error(`Gas data error: ${error.response?.data?.detail || error.message}`);
  }
};

// Закомментируйте или удалите этот вызов, так как он может вызывать ошибки при инициализации
// getAccountProperties()
//   .then(data => {
//     console.log('Account details:');
//     console.log(`Account number: ${data.number}`);
//     if (data.properties && data.properties.length > 0) {
//       console.log(`Number of properties: ${data.properties.length}`);
//     }
//   })
//   .catch(error => {
//     console.error('Failed to retrieve data:', error.message);
//   });