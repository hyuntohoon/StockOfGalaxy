import React, { useEffect, useState } from "react";
import {
  ModalContainer,
  LeftWrapper,
  CenterWrapper,
  Logo,
  Change,
  CompanyName,
  StockPrice,
} from "@/app/styles/planet-trend";
import {
  SelectedPlanetTrendData,
  PlanetTrendModalProps,
} from "@/app/types/main";

const tempData: SelectedPlanetTrendData[] = [
  {
    stockCode: "005930",
    corpName: "삼성전자",
    stockPrpr: "159394",
    prdyVrssSign: "+",
    prdyVrss: "2377",
    prdyCtrt: "1.5%",
    isFavorite: true,
    iconSrc: "/stock_logos/Stock005930.svg",
  },
  {
    stockCode: "000660",
    corpName: "SK하이닉스",
    stockPrpr: "159394",
    prdyVrssSign: "+",
    prdyVrss: "2377",
    prdyCtrt: "1.5%",
    isFavorite: true,
    iconSrc: "/stock_logos/Stock000660.svg",
  },
  {
    stockCode: "005380",
    corpName: "현대차",
    stockPrpr: "159394",
    prdyVrssSign: "+",
    prdyVrss: "2377",
    prdyCtrt: "1.5%",
    isFavorite: true,
    iconSrc: "/stock_logos/Stock005380.svg",
  },
  {
    stockCode: "068270",
    corpName: "셀트리온",
    stockPrpr: "159394",
    prdyVrssSign: "+",
    prdyVrss: "2377",
    prdyCtrt: "1.5%",
    isFavorite: true,
    iconSrc: "/stock_logos/Stock068270.svg",
  },
  {
    stockCode: "105560",
    corpName: "KB금융",
    stockPrpr: "159394",
    prdyVrssSign: "+",
    prdyVrss: "2377",
    prdyCtrt: "1.5%",
    isFavorite: true,
    iconSrc: "/stock_logos/Stock105560.svg",
  },
  {
    stockCode: "055550",
    corpName: "신한지주",
    stockPrpr: "159394",
    prdyVrssSign: "+",
    prdyVrss: "2377",
    prdyCtrt: "1.5%",
    isFavorite: true,
    iconSrc: "/stock_logos/Stock055550.svg",
  },
  {
    stockCode: "035420",
    corpName: "NAVER",
    stockPrpr: "159394",
    prdyVrssSign: "+",
    prdyVrss: "2377",
    prdyCtrt: "1.5%",
    isFavorite: true,
    iconSrc: "/stock_logos/Stock035420.svg",
  },
  {
    stockCode: "207940",
    corpName: "삼성바이오로직스",
    stockPrpr: "159394",
    prdyVrssSign: "+",
    prdyVrss: "2377",
    prdyCtrt: "1.5%",
    isFavorite: true,
    iconSrc: "/stock_logos/Stock207940.svg",
  },
];

const PlanetTrendModal: React.FC<PlanetTrendModalProps> = ({
  stockCode,
  corpName,
  position,
  camera,
  rendererDomElement,
}) => {
  const [screenPosition, setScreenPosition] = useState({ x: -9999, y: -9999 });
  const [selectedItem, setSelectedItem] =
    useState<SelectedPlanetTrendData | null>(null);

  useEffect(() => {
    const foundItem = tempData.find((item) => item.stockCode === stockCode);
    if (foundItem) {
      setSelectedItem(foundItem);
    }
  }, [stockCode]);

  useEffect(() => {
    if (!position || !camera || !rendererDomElement) return;

    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    const vector = position.clone();
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

    setScreenPosition({ x: x, y: y });
  }, [position, camera, rendererDomElement]);

  if (!selectedItem) return null;

  return (
    <ModalContainer
      style={{ top: `${screenPosition.y}px`, left: `${screenPosition.x}px` }}
    >
      <LeftWrapper>
        <Logo src={selectedItem.iconSrc} alt="logo" />
        <CompanyName>{selectedItem.corpName}</CompanyName>
      </LeftWrapper>
      <CenterWrapper>
        <StockPrice>
          {parseInt(selectedItem.stockPrpr).toLocaleString()}원
        </StockPrice>
        <Change
          color={selectedItem.prdyVrssSign === "+" ? "#F02C44" : "#2C6FF0"}
        >
          {selectedItem.prdyVrssSign}
          {parseInt(selectedItem.prdyVrss).toLocaleString()}원 (
          {selectedItem.prdyCtrt})
        </Change>
      </CenterWrapper>
    </ModalContainer>
  );
};

export default PlanetTrendModal;
