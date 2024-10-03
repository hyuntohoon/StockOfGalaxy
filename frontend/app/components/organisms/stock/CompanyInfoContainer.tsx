"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styled from "@emotion/styled";
import CompanyInfoNameContainer from "../../molecules/stock/CompanyInfoNameContainer";
import CompanyInfoSubContainer from "../../molecules/stock/CompanyInfoSubContainer";
import { getCompanyInfo } from "@/app/utils/apis/stock/getStockInfoData";

const Container = styled.div`
  width: 90%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  border-radius: 20px;
`;

const CompanyInfoContainer = () => {
  const { stock } = useParams();
  const stock_code: string = Array.isArray(stock)
    ? stock[0]
    : stock ?? "005930";

  const [companyInfo, setCompanyInfo] = useState({
    corpDetail: "",
    stockName: "",
    stockCode: "",
    ceoName: "",
    hmUrl: "",
    estDate: "",
    accMonth: "",
  });

  useEffect(() => {
    getCompanyInfo(stock_code).then((data) => {
      setCompanyInfo({
        corpDetail: data.corp_description,
        stockName: data.corp_name,
        stockCode: data.stock_code,
        ceoName: data.ceo_nm,
        hmUrl: data.hm_url,
        estDate: data.est_dt,
        accMonth: data.acc_mt,
      });
    });
  }, []);

  return (
    <>
      <Container>
        <CompanyInfoNameContainer
          stockName={companyInfo.stockName}
          stockCode={companyInfo.stockCode}
          corpDetail={companyInfo.corpDetail}
        />
        <CompanyInfoSubContainer
          ceoName={companyInfo.ceoName}
          hmUrl={companyInfo.hmUrl}
          estDate={companyInfo.estDate}
          accMonth={companyInfo.accMonth}
        />
      </Container>
    </>
  );
};

export default CompanyInfoContainer;
