'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import AreaChart from '@/app/components/molecules/timetravel/AreaChart';
import styled from '@emotion/styled';
import TypeWriter from './TypeWritter'; 
import { wordData } from '@/app/mocks/wordData';
import { useDate } from '@/app/store/date';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'; 

const TimeTravelContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;  
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
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

const DateInputContainer = styled.div<{ isChartVisible: boolean }>`
  margin-top: ${({ isChartVisible }) => (isChartVisible ? '0px' : '40px')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  opacity: ${({ isChartVisible }) => (isChartVisible ? 0 : 1)};
  display: ${({ isChartVisible }) => (isChartVisible ? "none" : "auto")};
  transition: opacity 1s ease, height 0.5s ease, margin-top 0.5s ease;
  overflow: hidden;
`;

const StyledDatePicker = styled(DatePicker)<{ isChartVisible: boolean }>`
  padding: ${({ isChartVisible }) => (isChartVisible ? '0px' : '12px')};
  border: 2px solid #0070f3;
  border-radius: 10px;
  font-size: ${({ isChartVisible }) => (isChartVisible ? '0px' : '16px')};
  width: 200px;
  text-align: center;
  background-color: #ffffff;
  transition: all 1s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: ${({ isChartVisible }) => (isChartVisible ? "none" : "auto")};


  &:focus {
    outline: none;
    border-color: #005bb5;
  }

  &:hover {
    border-color: #005bb5;
  }
  
  .react-datepicker__input-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .react-datepicker__day--selected {
    background-color: #0070f3;
    color: white;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #0070f3;
    color: white;
  }
`;

const ConfirmButton = styled.button<{ isChartVisible: boolean }>`
  padding: ${({ isChartVisible }) => (isChartVisible ? '10px' : '10px 20px')};
  background-color: rgba(128, 128, 128, 0.4);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ isChartVisible }) => (isChartVisible ? '0px' : '16px')};
  transition: all 1s ease;

  &:hover {
    background-color: rgba(128, 128, 128, 0.9);
  }
  display: ${({ isChartVisible }) => (isChartVisible ? "none" : "block")};
  height: ${({ isChartVisible }) => (isChartVisible ? '0px' : 'auto')};
  overflow: hidden;
`;

const InfoText = styled.p<{ isChartVisible: boolean }>`
  color: #fff;
  margin-top: 100px;
  font-size: 0.9rem;
  text-align: center;
  display: ${({ isChartVisible }) => (isChartVisible ? "none" : "auto")};

  
  animation: float 2s ease-in-out infinite; // 둥실둥실 애니메이션
  

  @keyframes float {
    0% {
      transform: translate(0,0) translateY(0);
    }
    50% {
      transform: translate(0,0) translateY(-5px); // 위로 5px 이동
    }
    100% {
      transform: translate(0,0) translateY(0);
    }
  }
`;

const ToggleButton = styled.button`
  background-color: rgba(128, 128, 128, 0.1);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  margin-top: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
  transition: background-color 1.5s;

  &:hover {
    background-color: rgba(128, 128, 128, 0.5);
  }

  animation: float 2s ease-in-out infinite; // 둥실둥실 애니메이션
  

  @keyframes float {
    0% {
      transform: translate(0,0) translateY(0);
    }
    50% {
      transform: translate(0,0) translateY(-5px); // 위로 5px 이동
    }
    100% {
      transform: translate(0,0) translateY(0);
    }
  }

  
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimeTravel = () => {
  const { date: dateString, setDate } = useDate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    if (selectedDate) {
      const offsetDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
      const newDate = offsetDate.toISOString().split('T')[0].replace(/-/g, '');
      setDate(newDate);
      router.push(`/main/${newDate}`);
    }
  };

  const toggleChartVisibility = () => setIsChartVisible((prev) => !prev);

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

      <Title>시간 여행</Title>

      <DateInputContainer isChartVisible={isChartVisible}>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
          showYearDropdown
          scrollableMonthYearDropdown
          isChartVisible={isChartVisible}
        />
        <ConfirmButton onClick={handleConfirm} isChartVisible={isChartVisible}>
          이동
        </ConfirmButton>
      </DateInputContainer>

      <InfoText isChartVisible={isChartVisible}>날짜별 주식 데이터를 한 눈에 확인할 수 있어요!</InfoText>

      <ToggleButton onClick={toggleChartVisibility}>
        {isChartVisible ? '차트 접기' : '차트 펼치기'}{' '}
        {isChartVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </ToggleButton>

      {isChartVisible && (
        <ChartContainer>
          <AreaChart data={data} detail={modalData} />
        </ChartContainer>
      )}
    </TimeTravelContainer>
  );
};

export default TimeTravel;
