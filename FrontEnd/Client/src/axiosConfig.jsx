import axios from "axios";

const axiosBase = axios.create({
  baseURL: "https://backendforum.lidiaafework.com/api", //back end url
});
export default axiosBase;
