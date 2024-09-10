/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface PlanetCardTitleProps {
  title: string;
}

const PlanetCardTitle = ({title}: PlanetCardTitleProps) => {
  return <h2 css={titleStyle}>{title}</h2>
}

const titleStyle = css`
  font-size: 22px;
  font-weight: bold;
  color: white;
  margin: 0;
`;

export default PlanetCardTitle;