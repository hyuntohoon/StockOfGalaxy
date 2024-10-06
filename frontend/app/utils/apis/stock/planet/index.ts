import { defaultRequest } from "../../request";

export const getStockName = async (stockCode: string) => {
  try {
    const res = await defaultRequest.get(`/stock/${stockCode}/name`);
    return res.data.stockName;
  } catch (error) {
    console.error("종목명 조회 실패", error);
    throw error;
  }
};

export const getStockInfo = async (stockCode: string) => {
  try {
    const res = await defaultRequest.get(`/stock/${stockCode}`);
    return res.data;
  } catch (error) {
    console.error("종목 정보 조회 실패", error);
    throw error;
  }
};
