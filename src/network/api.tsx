import axios from "axios";

var api = axios.create();
api.defaults.baseURL = process.env.IP_ADDRESS;
api.defaults.headers.common['Content-Type'] = 'application/json';


export default api;