"use client";

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

  // 가격을 포맷하는 함수
  const formatPrice = (price: number | string) => {
    if (typeof price === "number") {
      return price.toLocaleString();
    }
    return price; // 숫자 형식이 아닐 경우 그대로 반환
  };

  // 가격 변동을 포맷하는 함수
  const formatChange = (change: number | string) => {
    const numericChange =
      typeof change === "string" ? parseFloat(change) : change;
    return numericChange > 0
      ? `+${numericChange.toFixed(2)}`
      : numericChange.toFixed(2);
  };

  return (
    <FavoriteItemContainer isRemoving={isRemoving} onClick={onClick}>
      <LeftSection>
        <Icon src={iconSrc} size="40px" width={10} />
        <Info>
          <StyledText
            size="15px"
            weight="bold"
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
        <Text size="17px" weight="bold">
          {formatPrice(price)}원
        </Text>
        <Text
          size="14px"
          color={
            typeof change === "string" || change > 0 ? "#FF4500" : "#1E90FF"
          }
        >
          {formatChange(change)}
        </Text>
      </RightSection>
    </FavoriteItemContainer>
  );
};
