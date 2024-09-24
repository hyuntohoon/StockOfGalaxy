import styled from "styled-components";

const Container = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 10px 20px;
  width: 130px;
  height: 50px;
`;

const StyledTitle = styled.div`
  font-size: 0.8rem;
  color: #a0a0a3;
`;

const StyledContent = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

interface DividendProps {
  title: string;
  content: string;
}

const Dividend = ({ title, content }: DividendProps) => {
  return (
    <>
      <Container>
        <StyledTitle>{title}</StyledTitle>
        <StyledContent>{content}</StyledContent>
      </Container>
    </>
  );
};

export default Dividend;
