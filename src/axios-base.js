import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://61e13d9e63f8fc0017618ac9.mockapi.io/'
});

export default instance;