import styled from "@emotion/styled";
import starIcon from "@/public/starIcon.png";
import Image from "next/image";
import { subscribeStock } from "@/app/utils/stock/subscribeStock";

interface FontSize {
  $fontSize: number;
}

interface StockNameProps {
  koreanName?: string;
  fontSize?: number;
}

const Container = styled.div<FontSize>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${(props) => `${props.$fontSize}px`};
`;

const StyledImage = styled(Image)`
  margin-left: 5px;
  cursor: pointer;
`;

const StockName = ({ koreanName, fontSize = 15 }: StockNameProps) => {
  return (
    <>
      <Container $fontSize={fontSize}>
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
