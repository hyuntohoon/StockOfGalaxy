import axios from "axios";

export const login = async (formData) => {
  try {
    const res = await axios({
      method: "POST",
      url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/public/login",
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

export const signUp = (formData) => {
  console.log(formData);
};
