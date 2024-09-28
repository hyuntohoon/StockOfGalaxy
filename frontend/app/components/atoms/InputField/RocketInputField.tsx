import React, { useState } from 'react';
import styled from '@emotion/styled';
import CreateRocketButton from '../Button/CreateRocketButton';
import {useAccessToken} from '@/app/utils/libs/user/useAccessToken'; // useAccessToken 가져오기

const RocketInputField = () => {
  const [inputValue, setInputValue] = useState('');
  const { accessToken } = useAccessToken();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    if (accessToken) {
      console.log('Submitting comment:', inputValue);
      alert('로켓 작성하기 api 연결 필요');
      setInputValue(''); // 입력 필드 초기화
    } else {
      alert('로그인 후 댓글 작성이 가능합니다.');
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder={accessToken ? '댓글을 입력하세요' : '로그인 후 작성 가능합니다'} // 토큰 유무에 따라 placeholder 변경
        value={inputValue}
        onChange={handleInputChange}
        disabled={!accessToken} // 토큰 없으면 입력 불가 처리
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
