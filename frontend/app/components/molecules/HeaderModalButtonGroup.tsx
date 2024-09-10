/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

// Props 타입 정의
interface HeaderModalButtonGroupProps {
  icon: ReactNode;
  label: string;
}

const HeaderModalButtonGroup = ({ icon, label }: HeaderModalButtonGroupProps) => {
  return (
    <div css={buttonGroupStyle}>
      <div css={buttonContainerStyle}>
        {icon}
      </div>
      <div css={textStyle}>{label}</div>
    </div>
  );
};

// 헤더 모달 내 아이콘들 공통 스타일 정의
const buttonGroupStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 140px;
`;

const buttonContainerStyle = css`
  width: 18px;
  height: 18px;
  padding-inline: 8px;
  padding-block: 8px;
  display: flex;
  color: #fff;
  font-size: 26px;
  justify-content: center;
  align-items: center;
`;

const textStyle = css`
  color: #000000;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

export default HeaderModalButtonGroup;
