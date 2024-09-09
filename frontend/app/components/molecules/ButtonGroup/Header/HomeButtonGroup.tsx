"use client";
import { AiFillHome } from 'react-icons/ai';
import HeaderButtonGroup from '../../HeaderButtonGroup';
import Link from 'next/link';

interface HomeButtonGroupProps {
  onClick?: () => void; 
}

const HomeButtonGroup = ({ onClick }: HomeButtonGroupProps) => {

  return (
    <div
      onClick={(e) => {
        e.stopPropagation(); // 이벤트 전파 방지 (메뉴 닫힘 이벤트 방지)
        if (onClick) {
          onClick();
        }
      }}
    >
      <Link href="/">
        <HeaderButtonGroup
          icon={<AiFillHome />}
          label="홈"
        />
      </Link>
    </div>
  );
};

export default HomeButtonGroup;
