import createAuthClient from "./createAuthClient";

export const getInfo = async (accessToken, setAccessToken) => {
  const authClient = createAuthClient(accessToken, setAccessToken);

  try {
    const getInfoRes = await authClient({
      method: "GET",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/myPage",
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
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/myPage",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(deleteAccountRes);
  } catch (error) {
    console.log(error);
  }
};
