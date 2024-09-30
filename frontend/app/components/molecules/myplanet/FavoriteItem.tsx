'use client';

import { Icon } from "@/app/components/atoms/myplanet/Icon";
import Image from "next/image";
import like from "@/public/images/myplanet/like.png";
import unlike from "@/public/images/myplanet/unlike.png";
import {
  FavoriteItemContainer,
  LeftSection,
  Info,
  RightSection,
  FavoriteButton,
  FavoriteIconWrapper,
  Text,
} from "@/app/styles/myplanet";
import { FavoriteItemProps } from "@/app/types/myplanet";
import { useRouter } from "next/navigation";
import styled from "@emotion/styled";

const StyledText = styled(Text)`
  cursor: pointer;
`;

const StockPriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  padding: 5px;
  gap: 0;
`;

const StockPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white; /* 기본 텍스트 색상 */
  margin-bottom: 0px; /* 가격과 변화량 사이에 공간 추가 */
  padding-bottom: 0px; /* 
`;

const ChangePrice = styled.span<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? '#FF4500' : '#1E90FF')}; /* 빨간색과 파란색 */
  font-weight: bold;
  font-size: 14px;
  margin-top: 0px;
  text-align: right;
`;

const ChangeRate = styled.span<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? '#FF4500' : '#1E90FF')}; /* 빨간색과 파란색 */
  font-weight: bold;
`;

const formatPrice = (price: string | number): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return isNaN(numPrice) ? '0' : numPrice.toLocaleString(); 
};

export const FavoriteItem: React.FC<FavoriteItemProps> = ({
  rank,
  name,
  price,
  change,
  isFavorite,
  onToggleFavorite,
  iconSrc,
  isRemoving = false,
  onClick,
}) => {
  const router = useRouter();


  // 가격 변동을 포맷하는 함수
  const formatChange = (change: number | string) => {
    const numericChange = typeof change === 'string' ? parseFloat(change) : change;
    return numericChange > 0 ? `+${numericChange.toFixed(2)}` : numericChange.toFixed(2);
  };


  return (
    <FavoriteItemContainer isRemoving={isRemoving} onClick={onClick}>
      <LeftSection>
        <Icon src={iconSrc} size="40px" width={10} />
        <Info>
          <StyledText
            size="15px"
            weight="bold"
            onClick={() => router.push("/planet/main/005930/20240927")} // 예시 URL
          >
            {name}
          </StyledText>
          <FavoriteButton
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          >
            <FavoriteIconWrapper isFavorite={isFavorite}>
              <div className="card-container">
                <div className={`card-${rank}`}>
                  <div className="front">
                    <Image
                      src={like}
                      alt="Favorite Toggle"
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="back">
                    <Image
                      src={unlike}
                      alt="Favorite Toggle"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
            </FavoriteIconWrapper>
          </FavoriteButton>
        </Info>
      </LeftSection>
      <RightSection>
        {/* <Text size="17px" weight="bold">
          {formatPrice(price)}
        </Text>
        <Text
          size="14px"
          color={typeof change === 'string' || change > 0 ? "#FF4500" : "#1E90FF"}
        >
          {formatPrice(change)}
        </Text> */}
        <StockPriceContainer>
                            <StockPrice>{price ? `${formatPrice(price)}원` : ''}</StockPrice>
                            
                            {change && (
                                <ChangePrice isPositive={parseFloat(change) > 0}>
                                    {formatPrice(change)}원
                                </ChangePrice>
                            )}

                            {/* {stock.changeRate !== null && (
                                <ChangeRate isPositive={stock.changeRate > 0}>
                                
                                {Math.abs(stock.changeRate)}%
                                </ChangeRate> */}
                            {/* )} */}
                            </StockPriceContainer>
      </RightSection>
    </FavoriteItemContainer>
  );
};
