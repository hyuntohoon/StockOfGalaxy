export const calculatePriceChange = (rocketPrice: string, stockPrice: string): { priceChangeSign: string, priceChange: number } => {
  const parsedRocketPrice = Number(rocketPrice);
  const parsedStockPrice = Number(stockPrice);

  const priceChange = ((parsedStockPrice - parsedRocketPrice) / parsedRocketPrice) * 100;
  const formattedPriceChange = Math.abs(Number(priceChange.toFixed(2))); // 소수점 두 자리까지 반올림

  return {
    priceChangeSign: priceChange < 0 ? '-' : '+', // 부호 반환
    priceChange: formattedPriceChange, // 소수점 두 자리까지 반올림된 값
  };
};
