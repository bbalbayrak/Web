import axios from 'axios';

const API_URL = "https://portal-test.yenaengineering.nl/api";

export const getMarkers = () => {
  return axios.get(`${API_URL}/locations/latest`)
    .then(response => response.data)
    .catch(err => { throw err; });
};