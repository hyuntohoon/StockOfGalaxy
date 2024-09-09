import { useRouter } from "next/navigation";
import LoginButton from "../atoms/LoginButton";
import Login from "../../utils/Login";

const LoginButtonGroup = ({ inputValue, accessToken, setAccessToken }) => {
  const router = useRouter();

  return (
    <>
      <LoginButton
        value="로그인"
        onClick={() => {
          Login(inputValue, accessToken, setAccessToken);
        }}
      />
      <LoginButton
        value="회원가입"
        onClick={() => {
          router.push("/sign");
        }}
      />
    </>
  );
};

export default LoginButtonGroup;
