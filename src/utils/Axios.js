import axios from 'axios'
const BASE_URL = 'https://pandomart-bazaar.herokuapp.com/api/v1'
const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
const token = localStorage.getItem('baazar')
Axios.defaults.headers.common = { Authorization: `Bearer ${token}` }

export default Axios
