import { defaultRequest } from "../request";

// 요청 Body
// {
//   "memberId": 1,
//   "stockCode" : "123456", // 종목 번호
//   "stocPrpr" : "52100", // 현재가(댓글 작성 당시 주가)
//   "content": "응 절대 안 올라 평생 버텨봐",
// }
// 로켓 작성
export const createRocketApi = async (memberId: Number, stockCode: string, stocPrpr: string, content: string) => {
  try {
    const response = await defaultRequest.post('/rockets', {
      params: {
        memberId: memberId,
        stockCode: stockCode,
        stocPrpr: stocPrpr,
        content: content,
      }
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
    const response = await defaultRequest.delete(`/${rocketId}/members/${memberId}`);
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
    const response = await defaultRequest.get(`/rockets/${stockCode}/top7`);
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
    const response = await defaultRequest.get(`/rockets/${stockCode}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("로켓 전체 목록 조회 실패", error);
    throw error;
  }
}