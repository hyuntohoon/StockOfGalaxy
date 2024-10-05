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

export const StyledDatePicker = styled(DatePicker)<{ isChartVisible: boolean }>`
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