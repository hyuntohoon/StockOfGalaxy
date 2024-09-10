import { FaPowerOff } from "react-icons/fa6";
import HeaderModalButtonGroup from "../HeaderModalButtonGroup";

const SignOutButtonGroup = () => {
  return (
    <HeaderModalButtonGroup
      icon={<FaPowerOff />}
      label="로그아웃"
    />
  );
};
 
export default SignOutButtonGroup;