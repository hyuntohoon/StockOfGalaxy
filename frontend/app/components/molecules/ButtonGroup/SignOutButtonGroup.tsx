'use client'

import { FaPowerOff } from "react-icons/fa6";
import HeaderModalButtonGroup from "../HeaderModalButtonGroup";
import {useRouter} from 'next/navigation';
import { useIsLoggedIn, useAccessToken } from "@/app/store/userSlice";
import { logout } from "@/app/utils/apis/users";
import { useDate } from "@/app/store/date";

const SignOutButtonGroup = () => {
  const router = useRouter();
  const {setIsLoggedIn} = useIsLoggedIn();
  const { accessToken, setAccessToken} = useAccessToken();
  const {date} = useDate();

  const handleClickLogout = async () => {
    const res = await logout(accessToken, setAccessToken);
    setIsLoggedIn(false);
    setAccessToken("");
    router.push(`/main/${date}`);
  }


  return (
    <div onClick={handleClickLogout}>
      <HeaderModalButtonGroup
        icon={<FaPowerOff />}
        label="로그아웃"
      />
    </div>
  );
};
 
export default SignOutButtonGroup;