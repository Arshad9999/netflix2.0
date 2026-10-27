import axios from 'axios';
const instance = axios.create({ baseURL: 'https://api.themoviedb.org/3' });
export default {
  get(path) {
    if (!import.meta.env.VITE_TMDB_API_KEY) return Promise.reject(new Error('Movie catalog is not configured.'));
    return instance.get(path);
  },
};
