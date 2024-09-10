"use client"; // 클라이언트 컴포넌트로 선언

import { HiUser } from "react-icons/hi2";
import HeaderModalButtonGroup from "../HeaderModalButtonGroup";
import { useRouter } from 'next/navigation'; // useRouter 훅 임포트

const MypageButtonGroup = () => {
  const router = useRouter(); // useRouter 훅 사용

  // 마이페이지 버튼 클릭 시 /mypage 경로로 이동
  const handleMypageClick = () => {
    router.push('/mypage'); // /mypage 경로로 이동
  };

  return (
    <div onClick={handleMypageClick}> {/* 클릭 시 경로 이동 */}
      <HeaderModalButtonGroup
        icon={<HiUser />}
        label="마이페이지"
      />
    </div>
  );
};

export default MypageButtonGroup;
