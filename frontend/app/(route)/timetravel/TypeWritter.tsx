import React, { useState, useEffect } from 'react';
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
`;

// Using props to dynamically adjust animations based on text length
const typing = (length: number) => keyframes`
  from { width: 0; }
  to { width: ${length}ch; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: white; }
`;

// Typing animation with dynamic length
interface TypeWriterTextProps {
  length: number;
}

const TypeWriterText = styled.div<TypeWriterTextProps>`
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.15em solid white;
  ${({ length }) => css`
    animation: ${typing(length)} 1.5s steps(${length}, end),
               ${blinkCaret} 0.75s step-end infinite;
  `};
  color: white;
  font-size: 1.2em;
`;

// 타이핑될 메시지 배열
const messages = [
  // "우주를 여행하는 시간...",
  "데이터를 불러오는 중..."
];

const TypeWriter = ({ onFinish }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (index < messages.length - 1) {
        setIndex(index + 1);
      } else {
        onFinish(); // Callback when all messages are displayed
      }
    }, 3500); // Time to wait before changing message

    return () => clearTimeout(timer);
  }, [index, onFinish]);

  const currentMessage = messages[index];
  const messageLength = currentMessage.length;

  return (
    <LoadingContainer>
      {/* key={index}를 추가하여 React가 새로운 메시지마다 컴포넌트를 다시 렌더링 */}
      <TypeWriterText key={index} length={messageLength}>
        {currentMessage}
      </TypeWriterText>
    </LoadingContainer>
  );
};

export default TypeWriter;
