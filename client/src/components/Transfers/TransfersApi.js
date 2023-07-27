import axios from 'axios';

const API_URL = process.env.API_URL

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

export const getTransferByName = (name) => {
    return axios.get(`${API_URL}/transfers/${name}`)
      .then(response => response.data)
      .catch(err => { throw err; });
};