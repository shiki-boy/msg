import axios from "axios";
import Cookie from "js-cookie";

const config = {
  headers: {
    Authorization: Cookie.get("Authorization"),
  },
};

const httpClient = axios.create(config);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (401 === error.response.status || 403 === error.response.status) {
      delete httpClient.defaults?.headers["Authorization"];
      Cookie.remove("Authorization");
      Cookie.remove("refreshToken");
    }
    return Promise.reject(error.response);
  }
);

export default httpClient;
