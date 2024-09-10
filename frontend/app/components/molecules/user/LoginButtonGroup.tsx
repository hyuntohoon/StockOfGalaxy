import { useRouter } from "next/navigation";
import LoginButton from "../../atoms/user/LoginButton";
import { login } from "../../../utils/user/userAPI";
import useAccessToken from "@/app/utils/user/useAccessToken";

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
