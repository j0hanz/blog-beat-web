import axios from "axios";

axios.defaults.baseURL = "https://blog-beat-api-bab609deb9ee.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
