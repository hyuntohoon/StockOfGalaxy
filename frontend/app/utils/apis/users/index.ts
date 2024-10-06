import { useRouter } from "next/navigation";
import { defaultRequest, authRequest } from "../request";

export const login = async (formData, setAccessToken, setLogin) => {
  if (!formData.id || !formData.password) {
    alert("아이디와 비밀번호를 입력해주세요.");
    return false;
  }

  try {
    const loginRes = await defaultRequest.post("/user/login", {
      userId: formData.id,
      password: formData.password,
    });
    const authorizationHeader = loginRes.headers["authorization"];
    const accessToken = authorizationHeader
      ? authorizationHeader.replace(/^Bearer\s+/i, "")
      : null;

    console.log(loginRes);
    console.log(accessToken);
    if (accessToken) {
      setAccessToken(accessToken); // 유저 정보 저장
      setLogin(true);
      return loginRes.data.memberId;
    } else {
      alert("토큰이 존재하지 않습니다");
      throw new Error("토큰이 존재하지 않습니다.");
    }
  } catch (error) {
    console.error("로그인 요청 중 오류 발생:", error);
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
};

export const logout = async (memberId: number) => {
  try {
    const response = await defaultRequest.post(`/user/logout`, {
      memberId: memberId
    });
    console.log('로그아웃 response', response);
    return response.data;
  } catch (error) {
    console.error("로그아웃 실패", error);
    throw error;
  }
};

export const getInfo = async (accessToken, setAccessToken) => {
  const authClient = authRequest(accessToken, setAccessToken);

  try {
    const getInfoRes = await authClient.get("/user/auth/info");
    console.log(getInfoRes.data);
    return getInfoRes.data;
  } catch (error) {
    console.error("유저 정보 조회 실패:", error);
    throw error;
  }
};

export const deleteAccount = async (accessToken, setAccessToken) => {
  const authClient = authRequest(accessToken, setAccessToken);

  try {
    const deleteAccountRes = await authClient.delete("/user/quit");
    console.log(deleteAccountRes);
    alert("회원 탈퇴가 완료되었습니다.");
    return true;
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    alert("회원 탈퇴에 실패했습니다.");
    return false;
  }
};
