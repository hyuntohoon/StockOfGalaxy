export interface RocketData {
  memberId: number;
  nickname: string;
  price: string;
  message: string;
  createdAt: string;
  characterType: number;
}

export interface RocketPriceGroupProps {
  stockPrice: string;
  priceChange: number; // 변동률
  priceChangeSign: string; // 변동률 부호
}

export interface RocketCardProps {
  data: {
    rocketId: number,
    memberId: number;
    characterType: number;
    nickname: string;
    price: string; // 로켓 작성 당시 주가
    message: string;
    createdAt: string;
  };
  currentPrice: string; // 실시간으로 받아오는 현재 주가
}