import axios from "axios";

const baseAPI = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER,
});
console.log(process.env.REACT_APP_API_SERVER);
export default baseAPI;