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