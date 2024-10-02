'use client';
import React, { useState } from 'react';
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
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  
`;

const TimeTravel = () => {
  const [loading, setLoading] = useState(true);
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
 

  const modalData = Array.from({length: 365}, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      date: date.toISOString().split('T')[0],
      newsCount: Math.floor(Math.random() * 100),
      traffic: Math.floor(Math.random() * 200),
      topStocks: ['Samsung', 'Apple', 'Tesla'],
      wordCloudData : wordData,
    }
  })


  return (
    <TimeTravelContainer>
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