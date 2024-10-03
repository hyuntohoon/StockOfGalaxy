import { defaultRequest } from "../request";

export const getStockHistoryInfoApi = async (stockCode: string, date: string) => {
  try {
    const response = await defaultRequest.get(`/stock/${stockCode}/${date}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("주식 과거 정보 조회 실패", error);
    throw error;
  }
}

// top8 종목 기사수와 순위 조회
export const getPlanetTrendApi = async (date: string) => {
  try {
    const response = await defaultRequest.get(`/stock/top8/${date}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("플래닛 트랜드 조회 실패", error);
    throw error;
  }
}