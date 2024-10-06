import styled from "@emotion/styled";
import CompanyInfo from "@/app/components/organisms/stock/CompanyInfoContainer";
import Image from "next/image";
import thumbnail from "@/public/news_thumbnail/news_005930.jpg";

const Container = styled.div`
  display: flex;
  flex: 0 0 40%;
  flex-direction: column;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
`;

const SubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 100%;
  height: auto;
`;

const StockInfoTemplate = () => {
  return (
    <>
      <Container>
        <SubContainer>
          <Image src={thumbnail} alt="samsung" width={470} height={250} />
        </SubContainer>
        <SubContainer>
          <CompanyInfo />
        </SubContainer>
      </Container>
    </>
  );
};

export default StockInfoTemplate;
