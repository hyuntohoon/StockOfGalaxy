import { useRouter } from "next/navigation";
import LoginButton from "../atoms/LoginButton";

const LoginButtonGroup = () => {
  const router = useRouter();

  return (
    <>
      <LoginButton
        value="로그인"
        onClick={() => {
          alert("로그인 성공");
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
