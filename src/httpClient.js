import axios from "axios";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";

const config = {
  headers: {
    Authorization: Cookie.get("Authorization"),
  },
};

const httpClient = axios.create(config);

httpClient.interceptors.request.use(
  async (config) => {
    if (
      [
        "/login",
        "/password/reset/confirm",
        "/registration",
        "/logout",
        "/single-user-signup",
        "/password/reset",
        "/password/reset/confirm",
      ].some((v) => config.url.match(new RegExp(v)))
    ) {
      return config;
    }

    const refreshToken = Cookie.get("refreshToken");

    // refresh token
    try {
      if (!Cookie.get("Authorization")) {
        const { data } = await axios.post("/api/auth/token/refresh", {
          token: refreshToken,
        });

        const accessTokenExpires = new Date(
          jwtDecode(data.accessToken).exp * 1000
        );

        const refreshTokenExpires = new Date(
          jwtDecode(data.refreshToken).exp * 1000
        );
        Cookie.set("Authorization", `Bearer ${data.accessToken}`, {
          expires: accessTokenExpires,
        });

        httpClient.defaults.headers[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        config.headers["Authorization"] = `Bearer ${data.accessToken}`;

        Cookie.set("refreshToken", data.refreshToken, {
          expires: refreshTokenExpires,
        });
      }
    } catch (error) {
      Cookie.remove("Authorization");
      Cookie.remove("refreshToken");
      httpClient.defaults.headers["Authorization"] = null;
      config.headers["Authorization"] = null;
    }

    return config;
  },
  function (error) {
    // console.log( error )
    // Do something with request error
    return Promise.reject(error);
  }
);

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
