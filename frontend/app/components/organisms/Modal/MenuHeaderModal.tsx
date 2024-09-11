import styled from '@emotion/styled';
import Image from 'next/image';
import profile from './profile.png';
import LikedStockButtonGroup from '../../molecules/ButtonGroup/LikedStockButtonGroup';
import MypageButtonGroup from '../../molecules/ButtonGroup/MypageButtonGroup';
import SignOutButtonGroup from '../../molecules/ButtonGroup/SignOutButtonGroup';

interface MenuHeaderModalProps {
  onClose: () => void;
}

const MenuHeaderModal: React.FC<MenuHeaderModalProps> = ({ onClose }) => {
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ProfileSection>
          <Image src={profile} alt="프로필 사진" width={40} height={40} />
          <ProfileName>참</ProfileName>
        </ProfileSection>
        <hr />
        <MypageButtonGroup />
        <LikedStockButtonGroup />
        <hr />
        <SignOutButtonGroup />
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  top: 540px;
  left: 105px;
  z-index: 1000;
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
