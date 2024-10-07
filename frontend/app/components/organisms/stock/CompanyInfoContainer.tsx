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
    const getCompanyInfoData = async () => {
      const res = await getCompanyInfo(stock_code);
      setCompanyInfo({
        corpDetail: res.corp_description,
        stockName: res.corp_name,
        stockCode: res.stock_code,
        ceoName: res.ceo_nm,
        hmUrl: res.hm_url,
        estDate: res.est_dt,
        accMonth: res.acc_mt,
      });
    };

    getCompanyInfoData();
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
