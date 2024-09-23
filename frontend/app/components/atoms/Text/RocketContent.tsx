import styled from 'styled-components';

const RocketContent = ({ message }) => {
  return <StyledComment>{message}</StyledComment>;
};

const StyledComment = styled.p`
  font-size: 14px;
  color: #303030;
  margin-left: 4px;
`;

export default RocketContent;
