import { Icon } from '@/app/components/atoms/myplanet/Icon';
import Image from 'next/image'; // Next.js Image 컴포넌트 import
import like from '@/public/images/myplanet/like.png'; // 경로를 적절히 수정
import unlike from '@/public/images/myplanet/unlike.png'; // 경로를 적절히 수정
import { FavoriteItemContainer, LeftSection, Info, RightSection, FavoriteButton, FavoriteIconWrapper, Text } from '@/app/styles/myplanet';
import {FavoriteItemProps, } from '@/app/types/myplanet';


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
  return (
    <FavoriteItemContainer  isRemoving={isRemoving} onClick={onClick}>
    <LeftSection>
      <Icon src={iconSrc} size="40px" width={10} />
      <Info>
        <Text size="15px" weight="bold">{name}</Text>
        <FavoriteButton onClick={e => { e.stopPropagation(); onToggleFavorite(); }}>
          <FavoriteIconWrapper isFavorite={isFavorite}>
            <div className='card-container'>
            <div className={`card-${rank}`}>
              <div className='front'>
                <Image 
                  src={like} 
                  alt="Favorite Toggle" 
                  layout="fixed"
                  width={24} 
                  height={24} 
                />
              </div>
            <div className='back'>
              <Image 
                src={unlike} 
                alt="Favorite Toggle" 
                layout="fixed"
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
      <Text size="17px" weight="bold">{price}</Text>
      <Text size="14px" color={parseInt(change) > 0 ? '#FF4500' : '#1E90FF'}>{change}</Text>
    </RightSection>
  </FavoriteItemContainer>
  );
};
