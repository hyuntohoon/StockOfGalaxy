"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/app/components/molecules/timetravel/CustomDatePicker";
import { IoArrowBack } from "react-icons/io5";
import AreaChart from "@/app/components/molecules/timetravel/AreaChart";
import styled from "@emotion/styled";
import { wordData } from "@/app/mocks/wordData";
import { useDate } from "@/app/store/date";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import {
  TimeTravelContainer,
  Title,
  BackButton,
  DateInputContainer,
  StyledDatePicker,
  ConfirmButton,
  InfoText,
  ToggleButton,
} from "./style";
import { getTimeChart } from "@/app/utils/apis/timetravel";

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

const TimeTravel = () => {
  const { date: dateString, setDate } = useDate();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const router = useRouter();
  const today = new Date();
  const [chartData, setChartData] = useState([]);

  const handleConfirm = () => {
    if (selectedDate) {
      const offsetDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      );
      const newDate = offsetDate.toISOString().split("T")[0].replace(/-/g, "");
      setDate(newDate);
      router.push(`/main/${newDate}`);
    }
  };

  const toggleChartVisibility = () => setIsChartVisible((prev) => !prev);

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = await getTimeChart("20240101", "20240501");
      const formattedInitialData = initialData.stockVolumeAndNewsList.map(
        (item) => ({
          date: item.date,
          newsCount: item.articleCount,
          traffic: parseInt(item.totalStockVolume, 10) % 10000,
          topStocks:
            item.top3Stocks.length > 0 ? item.top3Stocks : ["", "", ""],
        })
      );
      setChartData(formattedInitialData.reverse());
    };
    fetchInitialData();
  }, []);

  return (
    <>
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
    </>
  );
};

export default TimeTravel;
