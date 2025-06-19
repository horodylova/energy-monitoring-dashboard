'use client'

import axios from 'axios';

const OCTOPUS_API_BASE_URL = 'https://api.octopus.energy';
const ACCOUNT_NUMBER = process.env.OCTOPUS_ENERGY_ACCOUNT_NUMBER || 'A-C733EB22';
const API_KEY = process.env.VITE_OCTOPUS_API_KEY || 'sk_live_0qGP7EUThqnNAkVNfK3pwWBqvtaxjTGJ';

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
    console.error('Error fetching account data:', error.response ? error.response.status : error.message);
    throw error;
  }
};

getAccountProperties()
  .then(data => {
    console.log('Account details:');
    console.log(`Account number: ${data.number}`);
    if (data.properties && data.properties.length > 0) {
      console.log(`Number of properties: ${data.properties.length}`);
    }
  })
  .catch(error => {
    console.error('Failed to retrieve data:', error.message);
  });