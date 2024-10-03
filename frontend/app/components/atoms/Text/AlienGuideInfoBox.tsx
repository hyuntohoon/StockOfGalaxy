import styled from '@emotion/styled';

const AlienGuideInfoBox = () => {
  return (
    <ContentBox>
      <div>오늘은 어떤 주식이 인기 있었을까요? 🌟 <br />
      주식이 뉴스에서 언급된 횟수에 따라 <br />주요 주식들을 행성 크기로 표현해보았어요!</div>
    </ContentBox>
  );
};

const ContentBox = styled.div`
  color: #e6e6e6;
  font-size: 14px;
  letter-spacing: 0.5px;
  padding: 5px;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 1.6; /* 행간 조절 */
`

export default AlienGuideInfoBox;