import axios from 'axios';

const API_URL = "https://portal-test.yenaengineering.nl/api";

// Son lokasyonları almak için endpoint
export const getLatestLocations = () => {
  return axios.get(`${API_URL}/locations/latest`)
    .then(response => response.data)
    .catch(err => { throw err; });
};

// Tüm lokasyonları almak için endpoint
export const getAllLocations = () => {
  return axios.get(`${API_URL}/locations`)
    .then(response => response.data)
    .catch(err => { throw err; });
};

// Yeni bir lokasyon oluşturmak için endpoint
export const createLocation = (locationData) => {
  return axios.post(`${API_URL}/locations`, locationData)
    .then(response => response.data)
    .catch(err => { throw err; });
};
