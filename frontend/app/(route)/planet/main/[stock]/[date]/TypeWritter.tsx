import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  flex-direction: column;
  color: #ffffffd1; // 텍스트 색상 추가
`;

const Heading = styled.h3`
  color: white; // 텍스트 색상 설정
  font-size: 2em; // 폰트 크기 설정
  margin-bottom: 20px; // 아래 여백 추가
`;


// 텍스트 길이에 따라 타이핑 애니메이션 설정
const typing = (length: number, duration: number) => keyframes`
  from { width: 0; }
  to { width: ${length}ch; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: white; }
`;

// 타이핑 애니메이션을 위한 스타일
interface TypeWriterTextProps {
  length: number;
  typingDuration: number;
}

const TypeWritterText = styled.div<TypeWriterTextProps>`
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.15em solid white;
  ${({ length, typingDuration }) => css`
    animation: ${typing(length, typingDuration)} ${typingDuration}ms steps(${length}, end),
               ${blinkCaret} 0.75s step-end infinite;
  `};
  color: white;
  font-size: 1.2em;
`;

// 타이핑될 메시지 배열
const messages = [
  "우주에서는 아무도 소리를 들을 수 없어요, 왜냐하면 소리가 전달될 공기가 없거든요.",
  "지구에서 밤하늘에 보이는 별들은 이미 수백, 수천 년 전에 빛을 발한 것들이에요.",
  "우주의 가장 큰 별은 태양의 1700배나 크지만 밀도는 훨씬 낮아요.",
  "지구에서 가장 가까운 블랙홀은 1,500광년 떨어져 있어요.",
  "우주에서는 물체가 계속 떠다니고, 아무런 힘이 가해지지 않으면 멈추지 않아요.",
];

const TypeWritter = ({ onFinish }) => {
  const randomIndex = Math.floor(Math.random() * messages.length); // 랜덤 인덱스 선택
  const currentMessage = messages[randomIndex]; // 랜덤 메시지
  const messageLength = currentMessage.length;

  const typingDuration = messageLength * 50; // 각 글자당 50ms로 설정

  useEffect(() => {
    const timer = setTimeout(() => {
      // 모든 글자가 타이핑 완료되면 onFinish 호출
      onFinish();
    }, typingDuration);

    return () => clearTimeout(timer); // 클린업
  }, [onFinish, typingDuration]);

  return (
    <LoadingContainer>
      <Heading>알고 계셨나요?</Heading>
      <TypeWritterText key={randomIndex} length={messageLength} typingDuration={typingDuration}>
        {currentMessage}
      </TypeWritterText>
    </LoadingContainer>
  );
};

export default TypeWritter;

