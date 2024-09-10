import axios from "axios";

const userIDRegex = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
const nicknameRegex = /^[a-zA-Z0-9가-힣\-_]{2,15}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateUserId = (userId) => {
  return userIDRegex.test(userId);
};

const validatePassword = (password) => {
  return passwordRegex.test(password);
};

const validateNickname = (nickname) => {
  return nicknameRegex.test(nickname);
};

const validateEmail = (email) => {
  return emailRegex.test(email);
};

export const signUpValidation = (
  isAuthenticated,
  userId,
  password,
  passwordCheck,
  nickname,
  email
) => {
  if (isAuthenticated === false) {
    alert("아이디 중복 확인을 먼저 해주세요.");
    return false;
  }

  if (password !== passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return false;
  }

  if (!validateUserId(userId)) {
    alert("아이디는 5~20자의 영문 소문자, 숫자로 시작해야 합니다.");
    return false;
  }

  if (!validatePassword(password)) {
    alert("비밀번호는 8자 이상의 대소문자, 숫자, 특수문자를 포함해야 합니다.");
    return false;
  }

  if (!validateNickname(nickname)) {
    alert("닉네임은 2~15자의 영문, 숫자, 한글, -, _로 이루어져야 합니다.");
    return false;
  }

  if (!validateEmail(email)) {
    alert("이메일 형식이 올바르지 않습니다.");
    return false;
  }

  return true;
};

export const userIdValidate = async (userId) => {
  try {
    const userIdValidateRes = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/public/validate/${userId}`,
    });

    if (userIdValidateRes.status === 200) {
      alert("사용 가능한 아이디입니다.");
      return true;
    } else {
      alert("이미 사용중인 아이디입니다.");
      return false;
    }
  } catch (error) {
    console.log(error);
    alert("아이디 중복 확인에 실패했습니다.");
    return false;
  }
};
