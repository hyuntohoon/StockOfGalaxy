import { useRecoilState } from "recoil";
import { accessTokenState } from "../../store/userSlice";

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  return { accessToken, setAccessToken };
};

export default useAccessToken;
