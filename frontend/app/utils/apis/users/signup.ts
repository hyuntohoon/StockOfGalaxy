import { defaultRequest } from "../../apis/request";

// 정규식 상수
const userIDRegex = /^[a-zA-Z0-9]{5,20}$/;
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{6,}$/;
const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,15}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 유효성 검사 함수
export const validateUserId = (userId) => userIDRegex.test(userId);
export const validatePassword = (password) => passwordRegex.test(password);
export const validateNickname = (nickname) => nicknameRegex.test(nickname);
export const validateEmail = (email) => emailRegex.test(email);

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
    alert(
      "아이디는 영문자와 숫자를 포함하여 5자 이상 20자 이하로 입력해야 합니다. "
    );
    return false;
  }

  if (!validatePassword(password)) {
    alert(
      "비밀번호는 영문자와 숫자를 포함하여 5자 이상 20자 이하로 입력해야 합니다."
    );
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
    const userIdValidateRes = await defaultRequest.get(
      `/user/validate/${userId}`
    );

    alert("사용 가능한 아이디입니다.");
    return true;
  } catch (error) {
    if (error.response.status === 409) {
      alert("이미 사용중인 아이디입니다.");
      return false;
    } else {
      console.error("아이디 중복 확인 요청 중 오류 발생:", error);
      alert("아이디 중복 확인에 실패했습니다. 다시 시도해주세요.");
      return false;
    }
  }
};

export const signUpApi = async (formData) => {
  try {
    const signUpRes = await defaultRequest.post(`/user/join`, formData);

    if (signUpRes.status === 200) {
      alert("회원가입에 성공했습니다.");
      return true;
    } else {
      throw new Error("회원가입 실패");
    }
  } catch (error) {
    console.error("회원가입 요청 중 오류 발생:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
};
