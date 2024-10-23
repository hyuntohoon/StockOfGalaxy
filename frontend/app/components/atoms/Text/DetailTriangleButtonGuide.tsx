import styled from "@emotion/styled";

const DetailTriangleButtonGuide = () => {
  return (
    <TextContainer>
      <TextStyle>더 많은 정보를 확인하려면<br/>아래의 버튼을 클릭하세요</TextStyle>
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
  animation: smooth-blink 2s ease-in-out infinite;  /* 스르륵 깜빡이는 애니메이션 */

  @keyframes smooth-blink {
    0%, 100% {
      opacity: 1;  /* 투명도 100% */
      transform: scale(1.01);  /* 원래 크기 */
    }
    50% {
      opacity: 0.6;  /* 투명도 0%로 스르륵 사라짐 */
      transform: scale(1);  /* 크기 1.2배로 확대 */
    }
  }
`;



export default DetailTriangleButtonGuide;
