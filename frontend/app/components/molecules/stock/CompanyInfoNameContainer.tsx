import styled from "@emotion/styled";

interface CompanyInfoNameContainerProps {
  stockName: string;
  stockCode: string;
  corpDetail: string;
}

const Container = styled.div``;

const CompanyInfoNameContainer = ({
  stockName,
  stockCode,
  corpDetail,
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
