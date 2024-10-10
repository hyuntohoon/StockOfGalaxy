"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/components/molecules/timetravel/CustomDatePicker";
import { IoArrowBack } from "react-icons/io5";
import AreaChart from "@/app/components/molecules/timetravel/AreaChart";
import styled from "@emotion/styled";
import { useDate } from "@/app/store/date";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  TimeTravelContainer,
  Title,
  BackButton,
  DateInputContainer,
  ConfirmButton,
  InfoText,
  ToggleButton,
} from "./style";
import { getTimeChart } from "@/app/utils/apis/timetravel";
import { keyframes } from "@emotion/react";

// 텍스트에 애니메이션 효과 추가
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.1);
  }
`;

const MovingText = styled.h2`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5); // 그림자 효과로 텍스트 가독성 향상
  animation: ${fadeIn} 6s ease-in-out infinite; // 애니메이션 적용
  z-index: 10000;
  text-align: center;
  white-space: nowrap; // 텍스트 줄바꿈 방지
`;
const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

// 비디오 스타일
const FullscreenVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
`;

const ChartContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, "");
};
const formatTravelDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};

const TimeTravel = () => {
  const { date: dateString, setDate } = useDate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const router = useRouter();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false); // 비디오 재생 여부 상태 추가
  const today = new Date();
  const [chartData, setChartData] = useState([]);

  const handleConfirm = () => {
    if (selectedDate) {
      const offsetDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      );
      const newDate = formatDate(offsetDate);
      setDate(newDate);

      // 비디오 재생 상태 설정 및 4초 후 페이지 이동
      setIsVideoPlaying(true);
      setTimeout(() => {
        router.push(`/main/${newDate}`); // 페이지 이동
      }, 4500); // 4초 후 이동
    }
  };

  const toggleChartVisibility = () => setIsChartVisible((prev) => !prev);
  useEffect(() => {
    const fetchInitialData = async () => {
      // 오늘 이전 7일간의 데이터를 먼저 가져옴
      const startDate7DaysAgo = new Date();
      startDate7DaysAgo.setDate(today.getDate() - 7);
      const formattedStartDate7DaysAgo = formatDate(startDate7DaysAgo);

      // 오늘 날짜 이전 7일간 데이터 가져오기
      const initialData = await getTimeChart(
        formattedStartDate7DaysAgo,
        formatDate(today)
      );
      const formattedInitialData = initialData.stockVolumeAndNewsList.map(
        (item: any) => ({
          date: item.date,
          newsCount: item.articleCount,
          traffic: parseInt(item.totalStockVolume, 10) % 10000,
          topStocks: item.top3Stocks,
        })
      );

      // 첫 번째 데이터만 먼저 화면에 표시
      setChartData(formattedInitialData.reverse());

      // 비동기적으로 오늘 이전 1년 데이터를 받아서 추가
      const startDate1YearAgo = new Date();
      startDate1YearAgo.setFullYear(today.getFullYear() - 1);
      const formattedStartDate1YearAgo = formatDate(startDate1YearAgo);

      const olderData = await getTimeChart(
        formattedStartDate1YearAgo,
        formattedStartDate7DaysAgo
      );
      const formattedOlderData = olderData.stockVolumeAndNewsList.map(
        (item: any) => ({
          date: item.date,
          newsCount: item.articleCount * 10,
          traffic: parseInt(item.totalStockVolume, 10) % 10000,
          topStocks: item.top3Stocks,
        })
      );

      // 기존 데이터에 1년 데이터를 추가
      setChartData(formattedOlderData.concat(formattedInitialData));
    };

    fetchInitialData();
  }, []);

  return (
    <>
      {isVideoPlaying && (
        <VideoContainer>
          <FullscreenVideo autoPlay muted>
            <source src="/videos/move.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </FullscreenVideo>

          <MovingText>{`${formatTravelDate(
            selectedDate!
          )}로 이동하는 중...`}</MovingText>
        </VideoContainer>
      )}

      {!isVideoPlaying && (
        <VideoContainer>
          <FullscreenVideo autoPlay loop muted>
            <source src="/videos/timetravel.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </FullscreenVideo>
          <TimeTravelContainer style={{ position: "relative" }}>
            <BackButton onClick={() => router.back()}>
              <IoArrowBack />
            </BackButton>

            <Title>시간 여행</Title>

            <DateInputContainer isChartVisible={isChartVisible}>
              <CustomDatePicker
                date={selectedDate}
                setDate={(date: Date) => setSelectedDate(date)}
              />
              <ConfirmButton
                onClick={handleConfirm}
                isChartVisible={isChartVisible}
              >
                이동
              </ConfirmButton>
            </DateInputContainer>

            <InfoText isChartVisible={isChartVisible}>
              날짜별 주식 데이터를 한 눈에 확인할 수 있어요!
            </InfoText>

            <ToggleButton onClick={toggleChartVisibility}>
              {isChartVisible ? "차트 접기" : "차트 펼치기"}{" "}
              {isChartVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </ToggleButton>

            {isChartVisible && (
              <ChartContainer>
                <AreaChart data={chartData} detail={chartData} />
              </ChartContainer>
            )}
          </TimeTravelContainer>
        </VideoContainer>
      )}
    </>
  );
};

export default TimeTravel;
