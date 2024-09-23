import styled from 'styled-components';

const RocketTimeStamp = ({ createdAt }) => {
  return <StyledTimestamp>{createdAt}</StyledTimestamp>;
};

const StyledTimestamp = styled.span`
  font-size: 12px;
  color: #666666;
  margin-left: 4px;
`;

export default RocketTimeStamp;
