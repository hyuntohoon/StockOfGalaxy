import styled from '@emotion/styled';
import PlanetCardTitle from '../../atoms/Text/PlanetCardTitle';
import { Icon } from '../../atoms/myplanet/Icon';
import { useParams } from 'next/navigation';

// todo: 실제 데이터로 변경
const tempData = {
  iconSrc: '/images/logo/samsung.png',
};

const PlanetSimpleInfoCard = () => {
  const stockCode = useParams().stock;
  return (
    <CardContainer>
      <CardTitle>
        <Icon src={tempData.iconSrc} size="40px" width={20} />
        <PlanetCardTitle title="삼성전자" />
      </CardTitle>
      <StockCode>{stockCode}</StockCode> {/* 회색 글씨로 stockCode 추가 */}
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 14px 20px;
  border-radius: 20px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 1000;
  min-width: 120px;
`;

const CardTitle = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`;

const StockCode = styled.span`
  display: flex;
  margin-left: 8px;
  margin-bottom: 5px;
  color: #ffffffd3;
  font-size: 14px;
  font-weight: 400;
  align-items: end;
  font-weight: bold;
`;

export default PlanetSimpleInfoCard;