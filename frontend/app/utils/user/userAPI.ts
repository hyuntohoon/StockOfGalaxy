import axios from "axios";

export const login = async (formData, setAccessToken) => {
  if (formData.id === "" || formData.password === "") {
    alert("아이디와 비밀번호를 입력해주세요.");
    return false;
  }

  try {
    const loginRes = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/public/login",
      data: {
        userId: formData.id,
        password: formData.password,
      },
    });

    console.log(loginRes);

    const authorizationHeader = loginRes.headers["authorization"];
    const accessToken = authorizationHeader
      ? authorizationHeader.replace(/^Bearer\s+/i, "")
      : null;

    setAccessToken(accessToken);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signUp = async (formData) => {
  try {
    const signUpRes = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/public/join",
      data: {
        userId: formData.userId,
        password: formData.password,
        nickname: formData.nickname,
        email: formData.email,
      },
    });

    console.log(signUpRes);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
