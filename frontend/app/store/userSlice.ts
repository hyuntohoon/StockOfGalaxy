// src/store/userSlice.ts
import { atom, useRecoilState } from "recoil";

// Access Token 상태
export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

// User 상태
export const userState = atom({
  key: "userState",
  default: null,
});

// memberId 상태 (숫자)
export const memberIdState = atom<number>({
  key: 'memberIdState',
  default: 0,  // 기본값 설정
});

// 로그인 상태
export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: true, // 초기값은 false
});

// accessToken 훅
export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  return { accessToken, setAccessToken };
};

// user 훅
export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);
  return { user, setUser };
};

// memberId 훅
export const useMemberId = () => {
  const [memberId, setMemberId] = useRecoilState(memberIdState);
  return { memberId, setMemberId };
}

// 로그인 상태 훅
export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  return { isLoggedIn, setIsLoggedIn };
};
