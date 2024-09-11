import styled from '@emotion/styled';
import PlanetCardTitle from '../../atoms/Text/PlanetCardTitle';
import PlanetCardInfo from '../../atoms/Text/PlanetCardInfo';

const tempData = {
  marketCap: 4029603000000000, // 시가총액
  lowestYear: 52360,       // 1년 최저가
  lowestDay: 154865,       // 1일 최저가
  highestDay: 161498,      // 1일 최고가
};

const PlanetSimpleInfoCard = () => {
  return (
    <CardContainer>
      <CardTitle>
        <PlanetCardTitle title="삼성전자" />
      </CardTitle>
      <Line />
      <InfoContainer>
        <div>
          <PlanetCardInfo label="시가총액" value={tempData.marketCap} />
          <PlanetCardInfo label="1년 최저" value={tempData.lowestYear} />
        </div>
        <div>
          <PlanetCardInfo label="1일 최저" value={tempData.lowestDay} />
          <PlanetCardInfo label="1일 최고" value={tempData.highestDay} />
        </div>
      </InfoContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 220px;
`;

const CardTitle = styled.div`
  text-align: center;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ffffffd1;
  margin-top: 12px;
  margin-bottom: 4px;
`;

export default PlanetSimpleInfoCard;
