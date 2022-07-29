import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://172.18.0.2:3010',
    timeout: 1000
})

export default axiosInstance