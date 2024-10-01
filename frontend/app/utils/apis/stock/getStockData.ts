import { defaultRequest } from "../request";

interface StockDailyPriceProps {
  stockDate: string;
  lowPrice: number;
  highPrice: number;
  startPrice: number;
  endPrice: number;
  prdyVrss: string;
  prdyVrssSign: string;
  prdyCtrt: string;
}

export const getDailyStockData = async (
  stockCode: string,
): Promise<StockDailyPriceProps | void> => {
  try {
    const res = await defaultRequest.get(`/stock/${stockCode}/dailyhistory`)
    console.log("여기");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};