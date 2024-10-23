import { useState } from "react";
import { FavoriteItem } from "../../molecules/myplanet/FavoriteItem";
import { FavoriteListContainer } from "@/app/styles/myplanet";
import {
  FavoriteItemProps,
  FavoriteItem as FavoriteItemType,
} from "@/app/types/myplanet";

interface FavoritesListProps {
  items: FavoriteItemType[];
  onToggleFavorite: (index: number) => void;
  setSelectedItem: (item: FavoriteItemType) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  items,
  onToggleFavorite,
  setSelectedItem,
}) => {
  // 로컬 상태에서 삭제 중인 아이템 관리
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  const handleToggleFavorite = (index: number) => {
    // 현재 아이템이 이미 제거 중인지 확인
    if (removingIndex === index) return;

    // 아이템이 제거 중인 상태로 설정
    setRemovingIndex(index);

    // 잠시 후, 실제 아이템 제거를 처리
    setTimeout(() => {
      onToggleFavorite(index); // 즐겨찾기 상태 토글
      setRemovingIndex(null); // 제거 완료 후 상태 초기화
    }, 500); // 애니메이션과 일치하도록 딜레이 설정
  };

  return (
    <FavoriteListContainer>
      {items.map((item, index) => (
        <FavoriteItem
          stockCode={item.stockCode}
          key={index}
          rank={item.rank}
          name={item.name}
          price={item.price}
          change={item.change}
          isFavorite={item.isFavorite}
          onToggleFavorite={() => handleToggleFavorite(index)}
          iconSrc={item.iconSrc}
          isRemoving={removingIndex === index} // 애니메이션 트리거
          onClick={() => setSelectedItem(item)} // 클릭 시 호출할 핸들러
        />
      ))}
    </FavoriteListContainer>
  );
};
