"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import Question from "@/public/question.png";
import { useState, MouseEvent } from "react";

interface DividendProps {
  title: string;
  content: string;
}

const Container = styled.div`
  background-color: #f5f5f5;
  border-radius: 15px;
  padding: 10px 20px;
  width: 145px;
  height: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 그림자 추가
`;

const StyledTitle = styled.div`
  font-size: 0.8rem;
  color: #a0a0a3;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const StyledContent = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const CustomModal = styled.div<{ top: number; left: number }>`
  position: fixed;
  top: ${(props) => props.top}px; // 이미지 하단에 위치
  left: ${(props) => props.left}px; // 이미지 오른쪽에 위치
  width: 180px;
  padding: 10px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 0.8rem;
  z-index: 10;
`;

const ModalTitle = styled.div`
  color: black;
  font-size: 1rem;
  font-weight: bold;
`;

const ModalContent = styled.div`
  margin-top: 5px;
  color: #666666;
`;

const Dividend = ({ title, content }: DividendProps) => {
  const [isHover, setIsHover] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: MouseEvent<HTMLImageElement>) => {
    const { clientX, clientY } = e;
    setPos({ x: clientY + 10, y: clientX + 10 });
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  let modalTitle = "";
  let modalContent = "";

  switch (title) {
    case "부채비율":
      modalTitle = "부채비율";
      modalContent =
        "총자본 대비 총부채의 비율로, 부채비율이 낮을수록 부채관리에 대한 안정성이 높다고 볼 수 있어요.";
      break;
    case "유동비율":
      modalTitle = "유동비율";
      modalContent =
        "유동부채 대비 유동자산의 비율로, 유동비율이 높을수록 단기부채 상환 능력에 대한 안정성이 높다고 볼 수 있어요.";
      break;
    default:
      modalTitle = "부채 증가율";
      modalContent =
        "전년 대비 부채의 증가율로, 부채가 급격히 증가할 경우 재무 건전성에 문제가 있을 수 있어요.";
      break;
  }

  return (
    <Container>
      <StyledTitle>
        {title}
        <Image
          src={Question}
          alt="question"
          width={15}
          height={15}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </StyledTitle>
      <StyledContent>{content}%</StyledContent>
      {isHover && (
        <CustomModal top={pos.x} left={pos.y}>
          <ModalTitle>{modalTitle}</ModalTitle>
          <ModalContent>{modalContent}</ModalContent>
        </CustomModal>
      )}
    </Container>
  );
};

export default Dividend;
