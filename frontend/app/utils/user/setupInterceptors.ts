import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const setupInterceptors = (
  axiosInstance,
  accessToken,
  setAccessToken
) => {
  axiosInstance.interceptors.request.use(async (config) => {
    if (accessToken) {
      const { exp } = await jwtDecode(accessToken);

      if (exp && Date.now() >= exp * 1000) {
        try {
          const newToken = await getNewToken();
          setAccessToken(newToken);
          accessToken = newToken;
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API 요청 오류:", error);
      return Promise.reject(error);
    }
  );
};

const getNewToken = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/public/reissue`,
    {},
    { withCredentials: true }
  );
  const authorizationHeader = res.headers["authorization"];
  const accessToken = authorizationHeader
    ? authorizationHeader.replace(/^Bearer\s+/i, "")
    : null;
  return accessToken;
};
