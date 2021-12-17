import axios from "axios";

//change to an environment url eventually
const customAxios = axios.create();

customAxios.defaults.headers.common["Content-Type"] = "application/json";
customAxios.defaults.headers.post["Content-Type"] = "application/json";
customAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default customAxios;
