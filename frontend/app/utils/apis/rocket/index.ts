import { defaultRequest } from "../request";

// 요청 Body
// {
//   "memberId" : 3, // Integer
//   "stockCode" : "005930", // String
//   "price" : 64000, // Integer
//   "message" : "아 내 돈 ~~~~~~~~~~~~~~~~" // String
// }
// 로켓 작성
export const createRocketApi = async (memberId: number, stockCode: string, stockPrice: number, content: string) => {
  try {
    const response = await defaultRequest.post('/stock/rocket', {
      memberId: memberId,
      stockCode: stockCode,
      price: stockPrice,
      message: content,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("로켓 작성 실패", error);
    throw error;
  }
}


// 로켓 삭제
export const deleteRocketApi = async (rocketId: Number, memberId: Number) => {
  try {
    const response = await defaultRequest.delete(`/stock/rocket/${rocketId}/member/${memberId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("로켓 삭제 실패", error);
    throw error;
  }
}

// 로켓 최신 7개 조회
export const getTop7RocketsApi = async (stockCode: string) => {
  try {
    const response = await defaultRequest.get(`/stock/rocket/${stockCode}/top7`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("로켓 최신 7개 조회 실패", error);
    throw error;
  }
}

// 로켓 전체 목록 조회
export const getRocketListApi = async (stockCode: string) => {
  try {
    const response = await defaultRequest.get(`/stock/rocket/${stockCode}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("로켓 전체 목록 조회 실패", error);
    throw error;
  }
}