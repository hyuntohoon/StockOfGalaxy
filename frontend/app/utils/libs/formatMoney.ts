export const formatMoney = (value: number): string => {
  const trillion = 1_000_000_000_000; // 조
  const billion = 1_000_000_000; // 억

  if (value >= trillion) {
    const trillionPart = Math.floor(value / trillion);
    const billionPart = Math.floor((value % trillion) / billion);
    return `${trillionPart}조 ${billionPart.toLocaleString()}억`;
  } else if (value >= billion) {
    return `${(value / billion).toLocaleString()}억`;
  }
  return value.toLocaleString(); // 억 이하일 경우
};
