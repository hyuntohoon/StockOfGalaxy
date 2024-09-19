import styled from "styled-components";
import starIcon from "@/public/starIcon.png";
import Image from "next/image";
import { subscribeStock } from "@/app/utils/stock/subscribeStock";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(props) => `${props.fontSize}px`};
`;

const StyledImage = styled(Image)`
  margin-left: 5px;
  cursor: pointer;
`;

const StockName = ({ koreanName, fontSize = 15 }) => {
  return (
    <>
      <Container fontSize={fontSize}>
        {koreanName}
        <>
          {fontSize !== 15 && (
            <StyledImage
              src={starIcon}
              alt="star-icon"
              width={fontSize}
              height={fontSize}
              onClick={subscribeStock}
            />
          )}
        </>
      </Container>
    </>
  );
};

export default StockName;
