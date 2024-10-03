import styled from '@emotion/styled';

interface InfoBoxProps {
  info: string[];
}

const AlienGuideInfoBox: React.FC<InfoBoxProps> = ({ info }) => {
  return (
    <ContentBox>
      {info.map((line, index) => (
        <div key={index}>{line}<br /></div>
      ))}
    </ContentBox>
  );
};

export default AlienGuideInfoBox;

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

