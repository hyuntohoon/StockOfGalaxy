'use client'

import { FaPowerOff } from "react-icons/fa6";
import HeaderModalButtonGroup from "../HeaderModalButtonGroup";
import {useRouter} from 'next/navigation';
import { useIsLoggedIn, useAccessToken } from "@/app/store/userSlice";
import { logout } from "@/app/utils/apis/users";
import { useDate } from "@/app/store/date";
import { useMemberId } from "@/app/store/userSlice";
import { useUser } from "@/app/store/userSlice";

interface SignOutButtonGroupProps {
  setIsModalOpen?: (state: boolean) => void; // onClick을 선택적으로 받음
}

const SignOutButtonGroup = ({ setIsModalOpen }: SignOutButtonGroupProps) => {
  const router = useRouter();
  const {setIsLoggedIn} = useIsLoggedIn();
  const { accessToken, setAccessToken} = useAccessToken();
  const { user, setUser } = useUser();
  const {date} = useDate();
  const { memberId, setMemberId } = useMemberId();

  const handleClickLogout = async () => {
    const res = await logout(memberId);
    setIsLoggedIn(false);
    setAccessToken("");
    setMemberId(null);
    setUser(null);
    if (setIsModalOpen) {
      setIsModalOpen(false); // 전달된 onClick 함수가 있을 때 실행
    }
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
