import axios from "axios";
import { setupInterceptors } from "./setupInterceptors";
import useAccessToken from "./useAccessToken";

const createAuthClient = (accessToken, setAccessToken) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const authClient = axios.create({
    baseURL,
    withCredentials: true,
  });

  setupInterceptors(authClient, accessToken, setAccessToken);

  return authClient;
};

export default createAuthClient;
