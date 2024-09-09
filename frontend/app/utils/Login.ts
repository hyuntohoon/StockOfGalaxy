import createAuthClient from "./createAuthClient";

const Login = async (formData, accessToken, setAccessToken) => {
  const authClient = createAuthClient(accessToken, setAccessToken);

  try {
    const res = await authClient({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/public/login",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        userId: formData.id,
        password: formData.password,
      },
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default Login;
