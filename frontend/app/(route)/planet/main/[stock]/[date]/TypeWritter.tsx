'use client';

import React, { useEffect, useState } from 'react';
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
  color: #ffffffd1;
`;

const Heading = styled.h3`
  color: white;
  font-size: 2em;
  margin-bottom: 20px;
`;

const typing = (length: number, duration: number) => keyframes`
  from { width: 0; }
  to { width: ${length}ch; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: white; }
`;

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

const messages = [
  "우주에서는 아무도 소리를 들을 수 없어요, 왜냐하면 소리가 전달될 공기가 없거든요.",
  "지구에서 밤하늘에 보이는 별들은 이미 수백, 수천 년 전에 빛을 발한 것들이에요.",
  "우주의 가장 큰 별은 태양의 1700배나 크지만 밀도는 훨씬 낮아요.",
  "지구에서 가장 가까운 블랙홀은 1,500광년 떨어져 있어요.",
  "우주에서는 물체가 계속 떠다니고, 아무런 힘이 가해지지 않으면 멈추지 않아요.",
];

const TypeWritter = ({ onFinish }) => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]); // 기본 메시지 설정
  const messageLength = currentMessage.length;
  const typingDuration = messageLength * 50;

  useEffect(() => {
    // 클라이언트 사이드에서만 랜덤 메시지 선택
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);

    const timer = setTimeout(() => {
      onFinish();
    }, typingDuration+1500);

    return () => clearTimeout(timer);
  }, [onFinish, typingDuration]);

  return (
    <LoadingContainer>
      <Heading>알고 계셨나요?</Heading>
      <TypeWritterText length={messageLength} typingDuration={typingDuration}>
        {currentMessage}
      </TypeWritterText>
    </LoadingContainer>
  );
};

export default TypeWritter;
