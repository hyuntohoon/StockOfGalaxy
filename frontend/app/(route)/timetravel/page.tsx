'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';  // Next.js 라우터 훅
import { IoArrowBack } from 'react-icons/io5';  // 뒤로 가기 아이콘
import AreaChart from '@/app/components/molecules/timetravel/AreaChart';
import styled from '@emotion/styled';
import TypeWriter from './TypeWritter'; 
import { wordData } from '@/app/mocks/wordData';

const TimeTravelContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;  // 뒤로 가기 버튼을 위해 추가
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
`;

const BackButton = styled.button`
  position: absolute;
  top: 25px;
  left: 25px;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;

  &:hover {
    color: #ddd;
  }
`;

const TimeTravel = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleLoadingFinish = () => setLoading(false);

  const data = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      newsCount: Math.floor(Math.random() * 100),
      traffic: Math.floor(Math.random() * 200),
      topStocks: ['Samsung', 'Apple', 'Tesla'],
    };
  }).reverse();

  const modalData = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      newsCount: Math.floor(Math.random() * 100),
      traffic: Math.floor(Math.random() * 200),
      topStocks: ['Samsung', 'Apple', 'Tesla'],
      wordCloudData: wordData,
    };
  });

  return (
    <TimeTravelContainer>
      <BackButton onClick={() => router.back()}>
        <IoArrowBack />
      </BackButton>
      {loading ? (
        <TypeWriter onFinish={handleLoadingFinish} />
      ) : (
        <>
          <Title>시간 여행</Title>
          <AreaChart data={data} detail={modalData} />
        </>
      )}
    </TimeTravelContainer>
  );
};

export default TimeTravel;
