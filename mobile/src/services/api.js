import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://10.0.2.2:3333' usado no emulador do android
    baseURL: 'http://192.168.0.104:3333'
});

export default api;