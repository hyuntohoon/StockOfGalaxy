import styled from '@emotion/styled';

interface RocketContentProps {
  message: string;
  fontWeight?: number;
};

const RocketContent = ({ message, fontWeight = 500 }: RocketContentProps) => {
  return <StyledComment fontWeight={fontWeight}>{message}</StyledComment>;
};

const StyledComment = styled.div<{fontWeight: number}>`
  font-weight: ${({ fontWeight }) => `${fontWeight}`}; 
  font-size: 14px;
  color: #303030;
  margin-left: 4px;
`;

export default RocketContent;
