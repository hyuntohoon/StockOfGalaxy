import styled from "@emotion/styled";

interface CompanyInfoSubContainerProps {
  ceoName: string;
  hmUrl: string;
  estDate: string;
  accMonth: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SubContainer = styled.div`
  display: flex;
  flex: 0 0 50%;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`;

const InnerContainer = styled.div`
  width: 47%;
  display: flex;
  flex-direction: row;
  font-size: 0.9rem;
  justify-content: space-between;
`;

const Hr = styled.hr`
  width: 100%;
  border: 0.1px solid #c3c3c6;
`;

const Href = styled.a`
  color: #0000ff;
  cursor: pointer;
  text-decoration: none;
`;

const CompanyInfoSubContainer = ({
  ceoName,
  hmUrl,
  estDate,
  accMonth,
}: CompanyInfoSubContainerProps) => {
  const formatDateString = (dateString: string): string => {
    if (dateString.length !== 8) return dateString;
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}`;
  };

  const ensureAbsoluteUrl = (url: string) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <>
      <Container>
        <SubContainer>
          <InnerContainer>
            <div>대표이사</div>
            <div>{ceoName}</div>
          </InnerContainer>
          <InnerContainer>
            <div>홈페이지</div>
            <Href href={ensureAbsoluteUrl(hmUrl)}>{hmUrl}</Href>
          </InnerContainer>
        </SubContainer>
        <SubContainer>
          <InnerContainer>
            <div>설립날짜</div>
            <div>{formatDateString(estDate)}</div>
          </InnerContainer>
          <InnerContainer>
            <div>결산월</div>
            <div>{accMonth}</div>
          </InnerContainer>
        </SubContainer>
      </Container>
    </>
  );
};

export default CompanyInfoSubContainer;
