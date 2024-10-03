import styled from "@emotion/styled";
import CompanyInfo from "@/app/components/organisms/stock/CompanyInfoContainer";
import Image from "next/image";

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
          <Image
            src="https://wimg.mk.co.kr/news/cms/202410/03/news-p.v1.20241003.7afb8c22b6d445ab886722334cd898be_P1.jpg"
            alt="samsung"
            width={470}
            height={250}
          />
        </SubContainer>
        <SubContainer>
          <CompanyInfo />
        </SubContainer>
      </Container>
    </>
  );
};

export default StockInfoTemplate;
