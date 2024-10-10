import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import StockIcon from "../../atoms/stock/StockIcon";
import { PlanetTrendSimpleModalProps } from "@/app/types/main";
import PlanetTrendRank from "../../atoms/Text/PlanetTrendRank";

interface stockState {
  stock_name: string | null;
  stock_code: string | null;
}

const PlanetTrendSimpleModal: React.FC<PlanetTrendSimpleModalProps> = ({
  stockCode,
  corpName,
  rank,
  position,
  camera,
  rendererDomElement,
  onClose,
}) => {
  const [screenPosition, setScreenPosition] = useState({ x: -9999, y: -9999 });
  const [modalSize, setModalSize] = useState({ width: 0, height: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>([
    {
      stock_name: corpName || null,
      stock_code: stockCode || null,
    },
  ]);

  const modalRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!position || !camera || !rendererDomElement) return;

    camera.updateMatrixWorld();
    camera.updateProjectionMatrix();

    const vector = position.clone();
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

    setScreenPosition({ x: x, y: y });

    // 모달 크기를 구하고 모달의 중심을 맞추기 위한 상태 설정
    if (modalRef.current) {
      const { offsetWidth, offsetHeight } = modalRef.current;
      setModalSize({ width: offsetWidth, height: offsetHeight });
    }

    // 애니메이션 시작을 위해 isVisible을 true로 설정
    setIsVisible(true);

  }, [position, camera, rendererDomElement]);

  if (!stockDataInfo[0]) return null;

  return (
    <>
      {/* PlanetTrendRank 컴포넌트 - 행성 위에 위치 */}
      <PlanetTrendRank
        rank={rank}
        position={position}
        camera={camera}
        rendererDomElement={rendererDomElement}
      />
      {/* PlanetTrendSimpleModal - 행성 중앙에 위치 */}
      <StyledModal
        ref={modalRef}
        isVisible={isVisible}
        style={{
          top: `${screenPosition.y - modalSize.height / 2}px`,
          left: `${screenPosition.x - modalSize.width / 2}px`,
        }}
      >
        <StockSimpleInfo>
          <StockIcon stock_code={stockDataInfo[0].stock_code} width={28} height={28} />
          <CompanyName>{stockDataInfo[0].stock_name}</CompanyName>
        </StockSimpleInfo>
      </StyledModal>
    </>
  );
};

// isVisible 상태에 따라 애니메이션 적용
const StyledModal = styled.div<{ isVisible: boolean }>`
  position: absolute;
  display: flex;
  align-items: center;
  background: #4646467d;
  border-radius: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 8px 10px;
  z-index: 2000;
  min-width: 30px;
  height: 30px;
  width: auto;

  /* 애니메이션 추가 */
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'translateY(0)' : 'translateY(0)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

const StockSimpleInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 2px;
`;

const CompanyName = styled.div`
  margin-left: 7px;
  font-weight: bold;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0.6px;
`;

export default PlanetTrendSimpleModal;
