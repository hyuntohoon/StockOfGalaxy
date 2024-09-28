const calculatePriceChange = (rocketPrice: string, stockPrice: string): string => {
  const parsedRocketPrice = Number(rocketPrice);
  const parsedStockPrice = Number(stockPrice);

  if (parsedRocketPrice === 0) {
      throw new Error("rocketPrice cannot be zero.");
  }
  
  const priceChange = ((parsedStockPrice - parsedRocketPrice) / parsedRocketPrice) * 100;
  return priceChange.toFixed(2) + '%'; // 소수점 두 자리까지 반올림하고 백분율 표시
};
