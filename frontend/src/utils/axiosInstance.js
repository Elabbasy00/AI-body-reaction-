import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 20000,
  // withCredentials: true,

  headers: {
    common: {
      Authorization: localStorage.getItem("token")
        ? "Token " + localStorage.getItem("token")
        : null,
      accept: "application/json",
    },
  },
});

export const setAxiosAuthToken = (token) => {
  if (typeof token !== "undefined" && token) {
    axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
