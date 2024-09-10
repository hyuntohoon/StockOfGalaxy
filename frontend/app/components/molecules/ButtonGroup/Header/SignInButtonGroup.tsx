import { HiUser } from "react-icons/hi2";
import HeaderButtonGroup from '../../HeaderButtonGroup';

const SignInButtonGroup = () => {
  return (
    <HeaderButtonGroup
      icon={<HiUser />}
      label="로그인"
    />
  );
};

export default SignInButtonGroup;
