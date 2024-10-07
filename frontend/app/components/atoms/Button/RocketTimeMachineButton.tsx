import React from 'react';
import styled from '@emotion/styled';
import { useRouter, useParams } from 'next/navigation';
import { useDate } from '@/app/store/date';
import { IBM_Plex_Sans_KR } from 'next/font/google';

const ibm = IBM_Plex_Sans_KR({ weight: '400', subsets: ['latin'] })

interface RocketTimeMachineButtonProps {
  createdAt: string; // '2024-10-01 19:08:20'
}

const RocketTimeMachineButton: React.FC<RocketTimeMachineButtonProps> = ({ createdAt }) => {
  const router = useRouter();
  const stockCodeParam = useParams().stock;
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;
  const {date, setDate} = useDate();

  const handleTimeMachineClick = () => {
    // createdAt에서 날짜 부분만 추출하고 'yyyymmdd' 형식으로 변환
    const newDate = createdAt.split(' ')[0].replace(/-/g, '');
    // console.log('newDate', newDate)
    setDate(newDate);

    const newPath = `/planet/main/${stockCode}/${newDate}`;
    router.push(newPath);
  };

  return (
    <Button className={ibm.className} onClick={handleTimeMachineClick}>
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
  transition: background-color 0.4s ease;
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
