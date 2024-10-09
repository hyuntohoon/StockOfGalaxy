import styled from '@emotion/styled';
import { IoCalendarSharp } from "react-icons/io5";

interface DateCardProps {
  date: string;
}

const formatDate = (dateString: string): string => {
  const year = dateString.slice(0, 4); // 연도
  const month = dateString.slice(4, 6); // 월
  const day = dateString.slice(6, 8); // 일
  return `${year}.${month}.${day}`;
};

const DetailPageDateCard = ({ date }: DateCardProps) => {
  return (
    <DateContent>
      <span>{formatDate(date)}</span>
    </DateContent>
  );
};

const DateContent = styled.div`
display: flex;
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
  top: 37px;
  left: 40px;
  z-index: 1000;
  width: 140px;
  height: 60px;
`;

export default DetailPageDateCard;
