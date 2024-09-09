/** @jsxImportSource @emotion/react */
'use client'
import { useRecoilValue } from 'recoil';
import { dateState } from '@/app/store/date';
import { IoCalendarSharp } from "react-icons/io5";
import { css } from '@emotion/react';

const DateCard = () => {
  const currentDate = useRecoilValue(dateState);

  return (
    <div css={dateCardContainer}>
      <IoCalendarSharp css={iconStyle} />
      <span>{currentDate}</span>
    </div>
  );
};


const dateCardContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 14px 20px;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 30px;
  right: 30px;
  z-index: 1000;
`;

const iconStyle = css`
  margin-right: 12px;
  font-size: 24px;
  color: #ffffff;
`;

export default DateCard;
