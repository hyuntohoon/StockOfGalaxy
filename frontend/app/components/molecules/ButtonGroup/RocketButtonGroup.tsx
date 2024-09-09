/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import rocketIcon from '../../atoms/Button/rocketIcon.png';

const RocketButtonGroup = () => {
  return (
    <div css={buttonGroupStyle}>
      <div css={iconStyle}>
        <Image src={rocketIcon} alt="로켓" width={50} height={50} />
      </div>
      <div css={textStyle}>로켓</div>
    </div>
  );
};

const buttonGroupStyle = css`
  position: fixed;
  bottom: 30px;
  right: 20px;
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

export default RocketButtonGroup;
