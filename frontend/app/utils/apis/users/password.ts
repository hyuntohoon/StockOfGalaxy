import { defaultRequest } from "../request";

export const sendAuthenticationCode = async (email) => {
    try {
      
      const res = await defaultRequest.post("/user/public/request-verification-code", {
        email: email,
      });
  
      alert("인증번호가 전송되었습니다.");
      console.log(res);
    } catch (error) {
      alert("인증번호 전송에 실패했습니다.");
      console.log(error);
    }
  };

  export const checkAuthenticationCode = async (authenticationCode) => {
    try {
        const res = await defaultRequest.post("/user/public/request-verification", {
            code: authenticationCode,
          });
  
      console.log(res);
      if (res.status === 200) {
        alert("인증되었습니다.");
        return true;
      } else {
        alert("인증번호가 일치하지 않습니다.");
        return false;
      }
    } catch (error) {
      alert("인증번호 확인에 실패했습니다.");
      console.log(error);
      return false;
    }
  };
  
  export const resetPassword = async (newPassword, newPasswordCheck) => {
    if (newPassword !== newPasswordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }
  
    try {
        const res = await defaultRequest.post("/user/public/change-password", {
            newPassword: newPassword,
          });
      
  
      console.log(res);
  
      if (res.status === 200) {
        alert("비밀번호가 변경되었습니다.");
        return true;
      } else {
        alert("비밀번호 변경에 실패했습니다.");
        return false;
      }
    } catch (error) {
      console.log(error);
      alert("비밀번호 변경에 실패했습니다.");
      return false;
    }
  };
  