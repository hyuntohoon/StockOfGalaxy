export const calculatePriceChange = (rocketPrice: string, stockPrice: string): { priceChangeSign: string, priceChange: string } => {
  const parsedRocketPrice = Number(rocketPrice);
  const parsedStockPrice = Number(stockPrice);

  if (parsedRocketPrice === 0) {
    throw new Error("rocketPrice cannot be zero.");
  }

  const priceChange = ((parsedStockPrice - parsedRocketPrice) / parsedRocketPrice) * 100;
  const formattedPriceChange = Math.abs(priceChange).toFixed(2); // 절대값으로 소수점 두 자리까지 반올림
  
  return {
    priceChangeSign: priceChange < 0 ? '-' : '+', // 전일 대비 부호
    priceChange: `${formattedPriceChange}%`, // 전일 대비율
  };
};
