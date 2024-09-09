import { useRouter } from "next/navigation";
import LoginButton from "../atoms/LoginButton";
import { login } from "../../utils/userAPI";

const LoginButtonGroup = ({ inputValue }) => {
  const router = useRouter();

  return (
    <>
      <LoginButton
        value="로그인"
        onClick={() => {
          login(inputValue);
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
