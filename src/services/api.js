import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.transparencia.gov.br/'
})

export default api;