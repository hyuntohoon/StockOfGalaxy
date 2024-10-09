import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 import
import styled from '@emotion/styled';
import moment from "moment";
import { useState } from "react";
import { IBM_Plex_Sans_KR } from 'next/font/google';

// IBM 글씨체 적용
const ibm = IBM_Plex_Sans_KR({ weight: '500', subsets: ['latin'] });

export const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;

  .react-calendar {
    width: 100%;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 15% 5%;
    background-color: rgba(255, 255, 255, 0.3);
  }

  /* 전체 폰트 컬러 */
  .react-calendar__month-view {
    abbr {
      color: #333333;
    }
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-weight: 800;
    font-size: 1rem;
  }

  /* 네비게이션 버튼 컬러 */
  .react-calendar__navigation button:focus {
    background-color: white;
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
    background-color: white;
    color: #000000;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-weight: 800;
  }

  /* 일요일에만 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title="일요일"] {
    color: #ff0000;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile--now {
    background: none;
    abbr {
      color: #ff7f27;
    }
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    border-radius: 0.8rem;
    background-color: #f0f0f0;
    padding: 0;
  }

  /* 네비게이션 현재 월 스타일 적용 */
  .react-calendar__tile--hasActive {
    background-color: #ff7f27;
    abbr {
      color: white;
    }
  }

  /* 일 날짜 간격 (여기에서 패딩 값을 조정하여 세로 간격을 넓힙니다) */
  .react-calendar__tile {
    padding: 10px 0px 28px; /* 기존 padding 값에서 세로 간격을 넓히기 위해 상하 패딩을 증가 */
    position: relative;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333333;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: #ffe4b3;
    border-radius: 0.3rem;
  }
`;

export const StyledCalendar = styled(Calendar)``;

/* 오늘 버튼 스타일 */
export const StyledDate = styled.div`
  position: absolute;
  right: 7%;
  top: 6%;
  background-color: #ffa500;
  color: #ffe4b3;
  width: 18%;
  min-width: fit-content;
  height: 1.5rem;
  text-align: center;
  margin: 0 auto;
  line-height: 1.6rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 800;
`;

/* 오늘 날짜에 텍스트 삽입 스타일 */
export const StyledToday = styled.div`
  font-size: x-small;
  color: #8b8b8b ; 
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
`;

/* 출석한 날짜에 점 표시 스타일 */
export const StyledDot = styled.div`
  background-color: #ff7f27;
  border-radius: 50%;
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translateX(-50%);
`;

interface CustomCalendarProps {
  selectedDate?: Date;
  setDate: (date: Date) => void;
  today: Date;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDate, setDate, today }) => {

  // 캘린더의 초기 날짜와 선택된 날짜를 today 값으로 설정
  const [activeStartDate, setActiveStartDate] = useState<Date | null>(today);

  const handleTodayClick = () => {
    const today = new Date();
    setActiveStartDate(today);
    setDate(today);
  };

  return (
    <StyledCalendarWrapper className={ibm.className}>
        <StyledCalendar
          value={selectedDate || today}
          onChange={setDate}
          formatDay={(locale, date) => moment(date).format("D")}
          formatYear={(locale, date) => moment(date).format("YYYY")}
          formatMonthYear={(locale, date) => moment(date).format("YYYY. MM")}
          calendarType="gregory"
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="year"
          activeStartDate={activeStartDate || undefined}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          tileContent={({ date, view }) => {
            let html = [];

            if (
              view === "month" &&
              date.getMonth() === today.getMonth() &&
              date.getDate() === today.getDate()
            ) {
              html.push(<StyledDot key={moment(date).format("YYYY-MM-DD")} />);
            }

            return <>{html}</>;
          }}
        />
    </StyledCalendarWrapper>
  );
};

export default CustomCalendar;
