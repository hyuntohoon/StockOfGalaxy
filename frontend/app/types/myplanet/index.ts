export interface FavoriteItemProps {
    rank: number;
    name: string;
    stockCode: string;
    price: string;
    change: string;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    iconSrc: string;
    isRemoving?: boolean; // 애니메이션을 제어할 추가 속성
    onClick: () => void; // 클릭 시 호출할 함수
  }

 export interface FavoriteItem {
    rank: number;
    name: string;
    stockCode: string;
    price: string;
    change: string;
    isFavorite: boolean;
    iconSrc: string;
  }
  