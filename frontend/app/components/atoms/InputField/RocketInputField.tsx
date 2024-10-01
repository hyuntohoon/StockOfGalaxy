import React, { useState, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import CreateRocketButton from '../Button/CreateRocketButton';
import { useIsLoggedIn } from '@/app/store/userSlice';
import { createRocketApi } from '@/app/utils/apis/rocket';
import { useParams } from 'next/navigation';
import { useMemberId } from '@/app/store/userSlice';

interface RocketInputFieldProps {
  currentPrice: number | null; // 실시간 주가 데이터
  isToday: boolean;
}

const RocketInputField: React.FC<RocketInputFieldProps> = ({ currentPrice, isToday }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { isLoggedIn } = useIsLoggedIn();
  const { memberId } = useMemberId();
  const stockCodeParam = useParams().stock as string | string[];
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (isLoggedIn && currentPrice !== null) {
      try {
        const response = await createRocketApi(
          memberId,
          stockCode,
          currentPrice,  // 실시간 주가를 함께 전송
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

  const getPlaceholderText = () => {
    if (!isLoggedIn) {
      return '로그인 후 댓글 작성이 가능합니다.';
    } else if (!isToday) {
      return '과거에서는 로켓 작성이 불가능합니다';
    } else {
      return '메시지를 입력하세요';
    }
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder={getPlaceholderText()}
        value={inputValue}
        onChange={handleInputChange}
        disabled={!isLoggedIn || !isToday}
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
