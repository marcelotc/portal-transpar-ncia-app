import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.transparencia.gov.br/'
})

export default api;

/* Nesse arquivo criamos uma url base para que possamos chamar somente o endpoint nos arquivos onde é
feita a requisição na api
 */