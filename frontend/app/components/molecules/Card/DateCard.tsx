import styled from '@emotion/styled';
import { IoCalendarSharp } from "react-icons/io5";

interface DateCardProps {
  right?: string; // 선택적 속성
  left?: string;  // 선택적 속성
  date: string;
  label?: string;
  width?: string;  // 선택적 속성 (width 추가)
  height?: string;
  top?: string;
}

const formatDate = (dateString: string): string => {
  const year = dateString.slice(0, 4); // 연도
  const month = dateString.slice(4, 6); // 월
  const day = dateString.slice(6, 8); // 일
  return `${year}.${month}.${day}`;
};

const DateCard = ({ right, left, date, label, width, height, top }: DateCardProps) => {
  return (
    <DateCardContainer right={right} left={left} width={width} height={height} top={top}>
      {label && <Label>{label}</Label>}
      {label && <Separator />}
      <div className="planet-container"><DateContent>
        <StyledCalendarIcon />
        <span>{formatDate(date)}</span>
      </DateContent></div>
    </DateCardContainer>
  );
};

// 스타일링 적용
const DateCardContainer = styled.div<{ right?: string; left?: string; width?: string, height?: string, top?:string }>`
  display: flex;
  flex-direction: column;  // 상하로 정렬
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 2px 20px;
  border-radius: 24px;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: ${({ top }) => top || '20px'};  // top이 있으면 적용, 없으면 기본값 20px
  ${({ right }) => right && `right: ${right};`}  // right가 있으면 적용
  ${({ left }) => left && `left: ${left};`}    // left가 있으면 적용
  z-index: 1000;
  width: ${({ width }) => width || '250px'};  // width가 있으면 적용, 없으면 기본값 250px
  height: ${({ height }) => height || '120px'}   // height 있으면 적용, 없으면 기본값 120px
`;

const Label = styled.span`
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Separator = styled.hr`
  width: 100%;
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  margin: 10px 0;
`;

const DateContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledCalendarIcon = styled(IoCalendarSharp)`
  margin-right: 12px;
  font-size: 24px;
  color: #ffffff;
`;

export default DateCard;
