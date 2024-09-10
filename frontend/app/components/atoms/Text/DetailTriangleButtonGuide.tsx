/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const DetailTriangleButtonGuide = () => {
  return (
    <div css={textContainer}>
      <div css={textStyle}>더 많은 정보를 확인하려면</div>
      <div>아래의 버튼을 클릭하세요</div>
    </div>
  );
};

const textContainer = css`
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #ffffffd0;
  text-align: center;
  z-index: 1000;
`;

const textStyle = css`
  margin-block: 4px;
`;

export default DetailTriangleButtonGuide;
