/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { formatMoney } from '@/app/utils/formatMoney';

interface PlanetCardInfoProps {
  label: string;
  value: number;
}

const PlanetCardInfo = ({ label, value }: PlanetCardInfoProps) => {
  return (
    <div css={infoItemStyle}>
      <span css={labelStyle}>{label}</span>
      <span>{formatMoney(value)}원</span>
    </div>
  );
};

const infoItemStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  color: white;
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
`;

const labelStyle = css`
  margin-top: 5px
`;

export default PlanetCardInfo;
