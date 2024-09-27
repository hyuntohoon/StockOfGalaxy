import React from 'react';
import styled from '@emotion/styled';

const RocketTimeMachineButton = () => {
  const handleTimeMachineClick = () => {
    alert('타임머신 api 연결 필요');
  };

  return (
    <Button onClick={handleTimeMachineClick}>
      <Text>타임머신</Text>
    </Button>
  );
};

const Button = styled.button`
  bottom: 10px;
  right: 10px;
  align-items: center;
  justify-content: center;
  background-color: #202938;
  border: none;
  border-radius: 30px;
  width: 70px;
  height: 34px;
  cursor: pointer;

  &:hover {
    background-color: #202938ba; /* 호버 시 배경색 변경 */
  }
`;

const Text = styled.span`
  font-size: 10px;
  color: #ffffff;
`;

export default RocketTimeMachineButton;
