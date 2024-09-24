import styled from "styled-components";

const RocketPrice = ({ price }) => {
  return (
    <StyledPrice>
      {Number(price).toLocaleString()}원
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  padding-left: 4px;
  display: flex;
  text-align: start;
  align-items: center;
  font-weight: 600;
  font-size: 13px;
  color: #666666;
`;

export default RocketPrice;