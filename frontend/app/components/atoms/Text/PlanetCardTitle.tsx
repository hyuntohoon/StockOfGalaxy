import styled from "@emotion/styled";

interface PlanetCardTitleProps {
  title: string;
}

const PlanetCardTitle = ({ title }: PlanetCardTitleProps) => {
  return <Title>{title}</Title>;
};

const Title = styled.h2`
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

export default PlanetCardTitle;
