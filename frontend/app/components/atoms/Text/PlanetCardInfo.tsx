import styled from '@emotion/styled';
import { formatMoney } from '@/app/utils/libs/formatMoney';

interface PlanetCardInfoProps {
  label: string;
  value: number;
}

const PlanetCardInfo = ({ label, value }: PlanetCardInfoProps) => {
  return (
    <InfoItem>
      <Label>{label}</Label>
      <span>{formatMoney(value)}원</span>
    </InfoItem>
  );
};

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  color: white;
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Label = styled.span`
  margin-top: 5px;
`;

export default PlanetCardInfo;
