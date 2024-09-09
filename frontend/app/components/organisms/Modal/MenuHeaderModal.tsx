/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import profile from './profile.png'
import LikedStockButtonGroup from '../../molecules/ButtonGroup/LikedStockButtonGroup';
import MypageButtonGroup from '../../molecules/ButtonGroup/MypageButtonGroup';
import SignOutButtonGroup from '../../molecules/ButtonGroup/SignOutButtonGroup';

interface MenuHeaderModalProps {
  onClose: () => void;
}

const MenuHeaderModal: React.FC<MenuHeaderModalProps> = ({ onClose }) => {
  return (
    <div css={modalContainerStyle}>
      <div css={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* todo: 전역상태에서 유저 정보 들고 오기 */}
        {/* 유저의 프로필 사진과 닉네임 */}
        <div css={profileSectionStyle}>
          <Image src={profile} alt="프로필 사진" width={40} height={40} />
          <span css={profileNameStyle}>참</span>
        </div>
        <hr />
        <MypageButtonGroup />
        <LikedStockButtonGroup />
        <hr />
        <SignOutButtonGroup />
      </div>
    </div>
  );
};

const modalContainerStyle = css`
  position: absolute;
  top: 540px;
  left: 105px;
  z-index: 1000;
`;

const modalStyle = css`
  background-color: #e6e6e6f6;
  margin-left: 10px;
  padding: 10px;
  border-radius: 30px;
  width: 170px;
  text-align: center;
`;

const profileSectionStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const profileNameStyle = css`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
`;

export default MenuHeaderModal;
