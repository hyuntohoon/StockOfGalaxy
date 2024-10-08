import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { IBM_Plex_Sans_KR } from 'next/font/google';

const ibm = IBM_Plex_Sans_KR({ weight: '400', subsets: ['latin'] })

const PlanetTrendErrorModal = ({ onClose }) => {
  const router = useRouter(); // useRouter 호출

  // 오늘 날짜로 이동하는 함수
  const handleTodayRedirect = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;

    // 오늘 날짜로 이동
    router.push(`/main/${formattedDate}`);
    onClose();
  };

  return (
    <Overlay>
      <ModalContent>
        <ModalTitle>데이터 오류</ModalTitle>
        <p>데이터가 비어 있습니다. <br /> 다시 시도하거나 오늘 날짜로 이동하세요.</p>
        <CloseButton className={ibm.className} onClick={handleTodayRedirect}>확인</CloseButton> {/* 확인 버튼 클릭 시 오늘 날짜로 이동 */}
      </ModalContent>
    </Overlay>
  );
};


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
`

const CloseButton = styled.button`
  background-color: #0e224d;
  font-size: 14px;
  font-weight: 500;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0e224db7;
  }
`;

export default PlanetTrendErrorModal;
