import styled from "@emotion/styled";
import DatePicker from 'react-datepicker';



export const TimeTravelContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  position: relative;  
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
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

export const DateInputContainer = styled.div<{ isChartVisible: boolean }>`
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

// StyledDatePicker 스타일 추가
export const StyledDatePicker = styled(DatePicker)`
  background: rgba(255, 255, 255, 0.1); /* 반투명 흰색 배경 */
  color: white; /* 텍스트 색상 흰색 */
  border: 1px solid rgba(255, 255, 255, 0.3); /* 테두리 색상 */
  border-radius: 5px; /* 둥근 모서리 */
  padding: 10px; /* 내부 여백 */
  width: 200px; /* 너비 설정 */
  font-size: 16px; /* 글자 크기 */
  font-family: 'Arial', sans-serif; /* 글꼴 설정 */

  /* 포커스 시 테두리 색상 변경 */
  &:focus {
    outline: none; /* 기본 포커스 아웃라인 제거 */
    border: 1px solid rgba(255, 255, 255, 0.7); /* 밝은 색으로 포커스 테두리 설정 */
  }

  /* 커스텀 드롭다운 스타일 */
  .react-datepicker__input-container {
    position: relative;
  }

  .react-datepicker__triangle {
    display: none; /* 기본 삼각형 표시 제거 */
  }

  /* 달력 스타일 */
  .react-datepicker {
    background: rgba(50, 50, 70, 0.9); /* 달력 배경 */
    border: 1px solid rgba(255, 255, 255, 0.5); /* 달력 테두리 */
    border-radius: 10px; /* 둥근 모서리 */
    color: white; /* 텍스트 색상 흰색 */
    font-family: 'Arial', sans-serif; /* 글꼴 설정 */
  }

  /* 날짜 버튼 스타일 */
  .react-datepicker__day {
    color: white; /* 날짜 텍스트 색상 */
    &:hover {
      background: rgba(255, 255, 255, 0.2); /* 호버 시 배경 색상 */
      border-radius: 5px; /* 호버 시 둥근 모서리 */
    }
  }

  /* 오늘 날짜 스타일 */
  .react-datepicker__day--today {
    font-weight: bold; /* 오늘 날짜 강조 */
    color: #ffcc00; /* 노란색으로 강조 */
  }

  /* 주말 날짜 스타일 */
  .react-datepicker__day--weekend {
    color: #ff4500; /* 빨간색으로 설정 */
  }

  /* 이전 및 다음 달 버튼 스타일 */
  .react-datepicker__navigation {
    background: transparent; /* 기본 배경 제거 */
    border: none; /* 기본 테두리 제거 */
    color: white; /* 화살표 색상 흰색 */
    cursor: pointer; /* 포인터 커서 변경 */
    &:hover {
      background: rgba(255, 255, 255, 0.1); /* 호버 시 배경 색상 */
    }
  }
`;

export const ConfirmButton = styled.button<{ isChartVisible: boolean }>`
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

export const InfoText = styled.p<{ isChartVisible: boolean }>`
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

export const ToggleButton = styled.button`
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