/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

// Props 타입 정의
interface HeaderButtonGroupProps {
  icon: ReactNode;  // icon은 ReactNode 타입으로 정의 (JSX 요소를 받을 수 있음)
  label: string;
  onClick?: () => void;  // onClick 핸들러를 선택적 속성으로 지정(HeaderButtonGroup에서는 필요 X 때문)
}

const HeaderButtonGroup = ({ icon, label }: HeaderButtonGroupProps) => {
  return (
    <div css={buttonGroupStyle}>
      <div css={buttonContainerStyle}>
        {icon}
      </div>
      <div css={textStyle}>{label}</div>
    </div>
  );
};

// 전역헤더 내 아이콘들 공통 스타일 정의
const buttonGroupStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
`;

const buttonContainerStyle = css`
  background-color: #393939;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  color: #fff;
  font-size: 26px;
  justify-content: center;
  align-items: center;
`;

const textStyle = css`
  color: #fff;
  margin-top: 5px;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
`;

export default HeaderButtonGroup;
