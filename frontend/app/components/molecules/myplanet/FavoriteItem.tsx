import { Icon } from "@/app/components/atoms/myplanet/Icon";
import Image from "next/image"; // Next.js Image 컴포넌트 import
import like from "@/public/images/myplanet/like.png"; // 경로를 적절히 수정
import unlike from "@/public/images/myplanet/unlike.png"; // 경로를 적절히 수정
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
  isRemoving = false, // 기본값 false
  onClick,
}) => {
  const router = useRouter();

  // 가격을 포맷하는 함수
  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  // price와 change 값이 문자열일 경우 숫자로 변환
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  const numericChange = typeof change === "string" ? parseFloat(change) : change;

  return (
    <FavoriteItemContainer isRemoving={isRemoving} onClick={onClick}>
      <LeftSection>
        <Icon src={iconSrc} size="40px" width={10} />
        <Info>
          <StyledText
            size="15px"
            weight="bold"
            onClick={() => router.push("/planet/main/005930/20240927")}
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
          {formatPrice(numericPrice)}
        </Text>
        <Text
          size="14px"
          color={numericChange > 0 ? "#FF4500" : "#1E90FF"} // 양수/음수에 따른 색상
        >
          {numericChange}
        </Text>
      </RightSection>
    </FavoriteItemContainer>
  );
};
