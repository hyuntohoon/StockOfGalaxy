import axios from "axios";

export const sendAuthenticationCode = async (email) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/public/reissue",
      data: {
        email: email,
      },
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthenticationCode = async (authenticationCode) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/public/reissue",
      data: {
        code: authenticationCode,
      },
    });

    console.log(res);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
