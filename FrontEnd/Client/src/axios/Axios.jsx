import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost:2200/api",
});
export default Axios;
