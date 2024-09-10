import createAuthClient from "./createAuthClient";

export const getInfo = async (accessToken, setAccessToken) => {
  const authClient = createAuthClient(accessToken, setAccessToken);

  try {
    const getInfoRes = await authClient({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/info",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(getInfoRes);
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = async (accessToken, setAccessToken) => {
  const authClient = createAuthClient(accessToken, setAccessToken);

  try {
    const deleteAccountRes = await authClient({
      method: "DELETE",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/quit",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(deleteAccountRes);
    alert("회원 탈퇴가 완료되었습니다.");
    return true;
  } catch (error) {
    console.log(error);
    alert("회원 탈퇴에 실패했습니다.");
    return false;
  }
};
