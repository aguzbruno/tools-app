import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que esta URL coincida con la URL de tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
