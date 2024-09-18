import axios from 'axios';

// Set the base URL for all axios requests
axios.defaults.baseURL = 'https://blog-beat-api-bab609deb9ee.herokuapp.com';

// Set the default Content-Type for POST requests
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// Allow credentials to be included in requests
axios.defaults.withCredentials = true;

// Create an axios instance for making requests
export const axiosReq = axios.create();

// Create an axios instance for handling responses
export const axiosRes = axios.create();
