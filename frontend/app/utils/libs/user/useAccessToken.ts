import { useRecoilState } from "recoil";
import { accessTokenState, userState, isLoggedInState } from "../../../store/userSlice";

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  return { accessToken, setAccessToken };
};

export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);
  return {user, setUser}
}

export const useIsLoggedIn = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useRecoilState(isLoggedInState);
  return { isLoggedIn, setIsLoggedIn };
}

