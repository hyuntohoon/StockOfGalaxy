import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { IBM_Plex_Sans_KR } from 'next/font/google';

const ibm = IBM_Plex_Sans_KR({ weight: '400', subsets: ['latin'] })

interface ReturnTodayModalProps {
  onClose: () => void;
}

const ReturnTodayModal: React.FC<ReturnTodayModalProps> = ({ onClose }) => {
  const router = useRouter();

  // 오늘 날짜로 이동하는 함수
  const handleTodayRedirect = () => {
    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 10).replace(/-/g, '');

    router.push(`/main/${formattedDate}`);
    onClose();
  };

  return (
    <Overlay>
      <ModalContent>
        <ModalTitle>알림</ModalTitle>
        <ModalText>오늘 날짜로 이동합니다.</ModalText>
        <ButtonContainer>
          <CloseButton className={ibm.className} onClick={handleTodayRedirect}>확인</CloseButton>
          <CancelButton className={ibm.className} onClick={onClose}>취소</CancelButton> {/* 취소 버튼 추가 */}
        </ButtonContainer>
      </ModalContent>
    </Overlay>
  );
};

// 스타일링
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 높은 z-index로 설정 */
`;

const ModalContent = styled.div`
  background-color: #ffffffe8;
  padding: 20px 80px;
  border-radius: 30px;
  text-align: center;
`;

const ModalTitle = styled.div`
  font-size: 22px;
  font-weight: 700;
  padding-block: 5px;
`;

const ModalText = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px; /* 버튼 사이의 간격 */
`;

const CloseButton = styled.button`
  background-color: #0e224d;
  font-size: 14px;
  font-weight: 500;
  color: white;
  padding: 12px 26px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0e224db7;
  }
`;

const CancelButton = styled(CloseButton)`
  background-color: #afafaf;
  &:hover {
    background-color: #777;
  }
`;

export default ReturnTodayModal;
