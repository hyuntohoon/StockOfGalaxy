// "use client"; // 클라이언트 컴포넌트로 선언

import { HiUser } from "react-icons/hi2";
import HeaderModalButtonGroup from "../HeaderModalButtonGroup";
import Link from "next/link"; // Link 컴포넌트 임포트

const MypageButtonGroup = () => {
  return (
    <Link href="/mypage" style={{ textDecoration: "none" }}>
      <HeaderModalButtonGroup
        icon={<HiUser />}
        label="마이페이지"
      />
    </Link>
  );
};

export default MypageButtonGroup;
