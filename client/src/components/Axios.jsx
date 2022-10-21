import axios from 'axios';
const token = localStorage.getItem("tokenStore")


const mainAxios = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { authorization: `Bearer ${token}` }
});

export { mainAxios };