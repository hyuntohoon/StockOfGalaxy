import styled from "@emotion/styled";

const DetailTriangleButtonGuide = () => {
  return (
    <TextContainer>
      <TextStyle>더 많은 정보를 확인하려면</TextStyle>
      <div>아래의 버튼을 클릭하세요</div>
    </TextContainer>
  );
};

const TextContainer = styled.div`
  position: fixed;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: #ffffffd0;
  text-align: center;
  z-index: 1100;
`;

const TextStyle = styled.div`
  margin-block: 4px;
`;

export default DetailTriangleButtonGuide;
