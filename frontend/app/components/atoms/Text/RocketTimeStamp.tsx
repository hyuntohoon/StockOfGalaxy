import styled from 'styled-components';

interface RocketTimeStampProps {
  createdAt: string;
  fontSize?: number;
}

const RocketTimeStamp: React.FC<RocketTimeStampProps> = ({ createdAt, fontSize = 12 }) => {
  return <StyledTimestamp fontSize={fontSize}>{createdAt}</StyledTimestamp>;
};

const StyledTimestamp = styled.span<{ fontSize: number }>`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: #666666;
  margin-left: 4px;
`;


export default RocketTimeStamp;
