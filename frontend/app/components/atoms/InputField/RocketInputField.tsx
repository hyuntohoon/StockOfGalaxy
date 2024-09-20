import React, { useState } from 'react';
import styled from '@emotion/styled';
import CreateRocketButton from '../Button/CreateRocketButton';

const RocketInputField = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitting comment:', inputValue);
    alert('로켓 작성하기 api 연결 필요')
    setInputValue(''); // 입력 필드 초기화
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="댓글을 입력하세요"
        value={inputValue}
        onChange={handleInputChange}
      />
      <CreateRocketButton onClick={handleSubmit}/>
    </Container>
  );
};

const Container = styled.div`
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 16px;
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  padding: 8px 10px;
  font-size: 16px;
  line-height: 1.5;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

export default RocketInputField;
