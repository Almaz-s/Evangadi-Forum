import axios from "axios";

const axiosBase = axios.create({
  baseURL: 'http://localhost:2200/', //back end url
});
export default axiosBase;
