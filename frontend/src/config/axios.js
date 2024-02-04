import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001';

function setToken() {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { setToken };
