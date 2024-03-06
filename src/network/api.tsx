import axios from "axios";
import ilpex from "../utils/ilpexUI";

var api = axios.create();

api.defaults.baseURL = `http://${process.env.IP_ADDRESS}:${process.env.BACKEND_PORT}`;
console.log(api.defaults.baseURL);
api.defaults.headers.common['Content-Type'] = 'application/json';


export default api;