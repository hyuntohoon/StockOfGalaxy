import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import ProfileImage from '../../atoms/ProfileImage';
import LikedStockButtonGroup from '../../molecules/ButtonGroup/LikedStockButtonGroup';
import MypageButtonGroup from '../../molecules/ButtonGroup/MypageButtonGroup';
import SignOutButtonGroup from '../../molecules/ButtonGroup/SignOutButtonGroup';
import { useUser } from '@/app/store/userSlice';

interface MenuHeaderModalProps {
  position: { top: number; left: number }; 
  onMouseEnter: () => void; // 모달에 마우스가 올라갈 때
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>; // 모달에서 마우스가 벗어날 때
}

// forwardRef 사용
const MenuHeaderModal = forwardRef<HTMLDivElement, MenuHeaderModalProps>(
  ({ position, onMouseEnter, onMouseLeave }, ref) => {
    const nickname = useUser().user.nickname;
    const characterType = useUser().user.characterType;
    return (
      <ModalContainer
        ref={ref}
        style={{ top: position.top, left: position.left }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ProfileSection>
            <ProfileImage characterType={characterType} alt={`${nickname}님의 프로필 사진`} />
            <ProfileName>{nickname}</ProfileName>
          </ProfileSection>
          <hr />
          <MypageButtonGroup />
          <LikedStockButtonGroup />
          <hr />
          <SignOutButtonGroup />
        </ModalContent>
      </ModalContainer>
    );
  }
);

// displayName 설정
MenuHeaderModal.displayName = 'MenuHeaderModal';

const ModalContainer = styled.div`
  position: absolute;
  z-index: 100000;
`;

const ModalContent = styled.div`
  background-color: #e6e6e6f6;
  margin-left: 10px;
  padding: 10px;
  border-radius: 30px;
  width: 170px;
  text-align: center;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const ProfileName = styled.span`
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
`;

export default MenuHeaderModal;
