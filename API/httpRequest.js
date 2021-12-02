import axios from 'axios';

const httpRequest = axios.create({
  baseURL: 'https://ventasdigitales-testing.cl.innovacion-gascaribe.com/api',
  timeout: 30000,
});

export default httpRequest;
