import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://coin-market-chart.herokuapp.com/api",
  responseType: "json",
  withCredentials: true,
});
