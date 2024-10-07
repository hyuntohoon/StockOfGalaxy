import styled from "@emotion/styled";
import CompanyInfo from "@/app/components/organisms/stock/CompanyInfoContainer";
import Image from "next/image";
import { useParams } from "next/navigation";

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
  margin: 0px;
  padding: 0px;

  img {
    border-radius: 15px; /* img 태그에 border-radius 적용 */
  }
`;


const StockInfoTemplate = () => {
  const { stock } = useParams();
  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";
  const thumbnail = `/company_images/image_${stock_code}.png`;

  return (
    <>
      <Container>
        <SubContainer>
          <Image src={thumbnail} alt="company_image" width={470} height={250} />
        </SubContainer>
        <SubContainer>
          <CompanyInfo />
        </SubContainer>
      </Container>
    </>
  );
};

export default StockInfoTemplate;
