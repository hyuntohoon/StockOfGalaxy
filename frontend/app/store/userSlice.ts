// src/store/userSlice.ts
import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";

// Access Token 상태
export const accessTokenState = atom({
  key: "accessTokenState",
  default: "", // 초기에는 빈 값으로 설정
});

interface User {
  userId: string;
  nickname: string;
  email: string;
  characterType: number;
}

// User 상태
export const userState = atom<User>({
  key: "userState",
  default: {
    userId: "",
    nickname: "",
    email: "",
    characterType: 0,
  },
});

// memberId 상태
export const memberIdState = atom<number>({
  key: "memberIdState",
  default: 0,
});

// 로그인 상태
export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});

// accessToken 훅
export const useAccessToken = () => {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(JSON.parse(storedAccessToken));
    }
  }, [setAccessToken]);

  // 업데이트 시 로컬스토리지에도 저장
  const setAccessTokenWithStorage = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", JSON.stringify(token));
  };

  return { accessToken, setAccessToken: setAccessTokenWithStorage };
};

// user 훅
export const useUser = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const setUserWithStorage = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return { user, setUser: setUserWithStorage };
};

// memberId 훅
export const useMemberId = () => {
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  useEffect(() => {
    const storedMemberId = localStorage.getItem("memberId");
    if (storedMemberId) {
      setMemberId(JSON.parse(storedMemberId));
    }
  }, [setMemberId]);

  const setMemberIdWithStorage = (id: number) => {
    setMemberId(id);
    localStorage.setItem("memberId", JSON.stringify(id));
  };

  return { memberId, setMemberId: setMemberIdWithStorage };
};

// 로그인 상태 훅
export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
  }, [setIsLoggedIn]);

  const setIsLoggedInWithStorage = (status: boolean) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", JSON.stringify(status));
  };

  return { isLoggedIn, setIsLoggedIn: setIsLoggedInWithStorage };
};
