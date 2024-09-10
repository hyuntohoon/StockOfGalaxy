/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import timeIcon from '../../atoms/Button/timeIcon.png';

const TimeMachineButtonGroup = () => {
  return (
    <div css={buttonGroupStyle}>
      <div css={iconStyle}>
        <Image src={timeIcon} alt="타임머신" width={50} height={50} />
      </div>
      <div css={textStyle}>타임머신</div>
    </div>
  );
};

const buttonGroupStyle = css`
  position: fixed;
  bottom: 30px;
  right: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  z-index: 1000;
`;

const iconStyle = css`
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const textStyle = css`
  color: #fff;
  margin-top: 3px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

export default TimeMachineButtonGroup;
