"use client";

import styled from "@emotion/styled";
import CompanyInfoNameContainer from "../../molecules/stock/CompanyInfoNameContainer";
import CompanyInfoSubContainer from "../../molecules/stock/CompanyInfoSubContainer";

const Container = styled.div`
  width: 500px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: white;
  border-radius: 20px;
`;

const CompanyInfoContainer = () => {
  const dummyData = {
    corpNameEng: "SAMSUNG ELECTRONICS CO,.LTD",
    corpDetail:
      "한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 226개의 종속기업으로 구성된 글로벌 전자기업임.",
    stockName: "삼성전자",
    stockCode: "005930",
    ceoName: "한종희",
    hmUrl: "www.samsung.com/sec",
    estDate: "19690113",
    accMonth: "12",
  };

  return (
    <>
      <Container>
        <CompanyInfoNameContainer
          stockName={dummyData.stockName}
          stockCode={dummyData.stockCode}
          corpNameEng={dummyData.corpNameEng}
          corpDetail={dummyData.corpDetail}
        />
        <CompanyInfoSubContainer
          ceoName={dummyData.ceoName}
          hmUrl={dummyData.hmUrl}
          estDate={dummyData.estDate}
          accMonth={dummyData.accMonth}
        />
      </Container>
    </>
  );
};

export default CompanyInfoContainer;
