import React from 'react';
import styled from 'styled-components';
import { Text } from '@/app/components/atoms/myplanet/Text';
import { Icon } from '@/app/components/atoms/myplanet/Icon';
import Image from 'next/image'; // Next.js Image 컴포넌트 import
import like from '@/public/images/myplanet/like.png'; // 경로를 적절히 수정
import unlike from '@/public/images/myplanet/unlike.png'; // 경로를 적절히 수정

interface FavoriteItemProps {
  rank: number;
  name: string;
  price: string;
  change: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  iconSrc: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(31, 31, 31, 0.7); /* 투명도 0.8 설정 */
  border-radius: 10px;
  padding: 12px 20px;
  margin-bottom: 10px;
  color: #ffffff;
`;


const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FavoriteButton = styled.div`
  width: 24px; /* Adjust size as needed */
  height: 24px;
  cursor: pointer;
  margin-left: 10px; /* Adjust margin as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
`;

export const FavoriteItem: React.FC<FavoriteItemProps> = ({
  rank,
  name,
  price,
  change,
  isFavorite,
  onToggleFavorite,
  iconSrc,
}) => {
  return (
    <Container>
      <LeftSection>
        <Icon src={iconSrc} size="40px" />
        <Info>
          <Text size="15px" weight="bold">{name}</Text>
          <FavoriteButton onClick={onToggleFavorite}>
            <Image 
              src={isFavorite ? like : unlike} 
              alt="Favorite Toggle" 
              layout="fixed" // layout 설정 (fixed, responsive, fill, intrinsic)
              width={24} 
              height={24} 
            />
          </FavoriteButton>
        </Info>
      </LeftSection>
      <RightSection>
        <Text size="17px" weight="bold">{price}</Text>
        <Text size="14px" color={parseInt(change) > 0 ? '#FF4500' : '#1E90FF'}>{change}</Text>
      </RightSection>
    </Container>
  );
};
