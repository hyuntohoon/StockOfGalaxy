import styled from "@emotion/styled";

interface CompanyInfoNameContainerProps {
  stockName: string;
  stockCode: string;
  corpDetail: string;
  corpNameEng: string;
}

const Container = styled.div``;

const CompanyInfoNameContainer = ({
  stockName,
  stockCode,
  corpDetail,
  corpNameEng,
}: CompanyInfoNameContainerProps) => {
  return (
    <>
      <div>{stockName}</div>
      <div>{stockCode}</div>
      <div>{corpDetail}</div>
    </>
  );
};

export default CompanyInfoNameContainer;
