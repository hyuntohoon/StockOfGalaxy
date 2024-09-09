/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { GoTriangleUp } from "react-icons/go";

const DetailTriangleButton = () => {
  return (
    <div css={buttonStyle}>
      <GoTriangleUp />
    </div>
  );
};

const buttonStyle = css`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%); /* 중앙 정렬 */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    color: #c6b6d0; /* 호버시 색상 변경 */
  }
`;

export default DetailTriangleButton;