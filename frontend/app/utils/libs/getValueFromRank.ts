// Rank에 따라 value 값을 설정
export const getValueFromRank = (rank: number) => {
  switch (rank) {
    case 1:
      return 180;
    case 2:
      return 160;
    case 3:
      return 150;
    case 4:
      return 135;
    case 5:
      return 110;
    case 6:
      return 95;
    case 7:
      return 80;
    case 8:
      return 65;
    default:
      return 50; // 기본 값
  }
};