import { useRouter } from "next/navigation";
import LoginButton from "../../atoms/user/LoginButton";
import { login } from "@/app/utils/apis/users";
import useAccessToken from "@/app/utils/libs/user/useAccessToken";

const LoginButtonGroup = ({ inputValue }) => {
  const router = useRouter();
  const { setAccessToken } = useAccessToken();

  return (
    <>
      <LoginButton
        value="로그인"
        onClickProps={() => {
          login(inputValue, setAccessToken);
        }}
      />
      <LoginButton
        value="회원가입"
        onClickProps={() => {
          router.push("/sign");
        }}
      />
    </>
  );
};

export default LoginButtonGroup;
