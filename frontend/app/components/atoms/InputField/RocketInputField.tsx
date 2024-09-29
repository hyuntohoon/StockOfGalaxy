import React, { useState } from 'react';
import styled from '@emotion/styled';
import CreateRocketButton from '../Button/CreateRocketButton';
import { useRecoilValue } from 'recoil';
import { isLoggedInState } from '@/app/store/userSlice';
import { createRocketApi } from '@/app/utils/apis/rocket';
import { useParams } from 'next/navigation';

const RocketInputField = () => {
  const [inputValue, setInputValue] = useState('');
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const memberId = 1; // todo: 실제 회원 ID로 수정 필요
  const stockCodeParam = useParams().stock;
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;
  const stockPrice = "52100"; // todo: ws 연결해서 댓글 작성 당시의 주가로 변경해야 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (isLoggedIn) {
      try {
        const response = await createRocketApi(
          memberId,
          stockCode,   
          stockPrice,
          inputValue
        );
        console.log('로켓 작성 성공:', response);
        alert('로켓이 작성되었습니다.');
        setInputValue(''); // 입력 필드 초기화
      } catch (error) {
        alert('로켓 작성에 실패했습니다.');
      }
    } else {
      alert('로그인 후 댓글 작성이 가능합니다.');
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder={isLoggedIn ? '댓글을 입력하세요' : '로그인 후 작성 가능합니다'}
        value={inputValue}
        onChange={handleInputChange}
        disabled={!isLoggedIn}
      />
      <CreateRocketButton onClick={handleSubmit} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
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
