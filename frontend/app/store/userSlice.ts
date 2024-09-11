import { atom, useRecoilState } from "recoil";

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  return { accessToken, setAccessToken };
};
