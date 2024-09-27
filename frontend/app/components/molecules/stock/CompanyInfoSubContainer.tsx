interface CompanyInfoSubContainerProps {
  ceoName: string;
  hmUrl: string;
  estDate: string;
  accMonth: string;
}

const CompanyInfoSubContainer = ({
  ceoName,
  hmUrl,
  estDate,
  accMonth,
}: CompanyInfoSubContainerProps) => {
  return (
    <>
      <div>{ceoName}</div>
      <div>{hmUrl}</div>
      <div>홈페이지: {estDate}</div>
      <div>{accMonth}월</div>
    </>
  );
};

export default CompanyInfoSubContainer;
