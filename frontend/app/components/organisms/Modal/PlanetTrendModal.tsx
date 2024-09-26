import React, { useEffect, useState } from 'react';
import { ModalContainer, LeftWrapper, CenterWrapper, Logo, Change, CompanyName, StockPrice } from '@/app/styles/planet-trend';
import { SelectedPlanetTrendData, PlanetTrendModalProps } from '@/app/types/main';

const tempData: SelectedPlanetTrendData[] = [
  { stockCode: '100001', corpName: '삼성전자', stockPrpr: '159394', prdyVrssSign: '+', prdyVrss: '2377', prdyCtrt: '1.5%', isFavorite: true, iconSrc: '/images/logo/samsung.png' },
  { stockCode: '100002', corpName: 'HLB', stockPrpr: '77968', prdyVrssSign: '+', prdyVrss: '2190', prdyCtrt: '2.8%', isFavorite: true, iconSrc: '/images/logo/hlb.png' },
  { stockCode: '100003', corpName: '에코프로', stockPrpr: '51796', prdyVrssSign: '-', prdyVrss: '227', prdyCtrt: '3.1%', isFavorite: true, iconSrc: '/images/logo/ecopro.png' },
  { stockCode: '100004', corpName: 'SK하이닉스', stockPrpr: '159394', prdyVrssSign: '+', prdyVrss: '2377', prdyCtrt: '1.5%', isFavorite: true, iconSrc: '/images/logo/SK.png' },
  { stockCode: '100005', corpName: '유한양행4', stockPrpr: '77968', prdyVrssSign: '+', prdyVrss: '2190', prdyCtrt: '2.8%', isFavorite: true, iconSrc: '/images/logo/uhan.png' },
  { stockCode: '100006', corpName: '유한양행1', stockPrpr: '77968', prdyVrssSign: '+', prdyVrss: '2190', prdyCtrt: '2.8%', isFavorite: true, iconSrc: '/images/logo/uhan.png' },
  { stockCode: '100007', corpName: '유한양행3', stockPrpr: '77968', prdyVrssSign: '+', prdyVrss: '2190', prdyCtrt: '2.8%', isFavorite: true, iconSrc: '/images/logo/uhan.png' },
  { stockCode: '100008', corpName: '유한양행2', stockPrpr: '77968', prdyVrssSign: '+', prdyVrss: '2190', prdyCtrt: '2.8%', isFavorite: true, iconSrc: '/images/logo/uhan.png' },
];

const PlanetTrendModal: React.FC<PlanetTrendModalProps> = ({ stockCode, corpName, position, camera, rendererDomElement }) => {
  const [screenPosition, setScreenPosition] = useState({ x: -9999, y: -9999 });
  const [selectedItem, setSelectedItem] = useState<SelectedPlanetTrendData | null>(null);

  useEffect(() => {
    const foundItem = tempData.find(item => item.stockCode === stockCode);
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
    <ModalContainer style={{ top: `${screenPosition.y}px`, left: `${screenPosition.x}px` }}>
      <LeftWrapper>
        <Logo src={selectedItem.iconSrc} alt="logo" />
        <CompanyName>{selectedItem.corpName}</CompanyName>
      </LeftWrapper>
      <CenterWrapper>
        <StockPrice>{parseInt(selectedItem.stockPrpr).toLocaleString()}원</StockPrice>
        <Change color={selectedItem.prdyVrssSign === '+' ? '#F02C44' : '#2C6FF0'}>
          {selectedItem.prdyVrssSign}{parseInt(selectedItem.prdyVrss).toLocaleString()}원 ({selectedItem.prdyCtrt})
        </Change>
      </CenterWrapper>
    </ModalContainer>
  );
};


export default PlanetTrendModal;
