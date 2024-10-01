import { defaultRequest } from "../request";

const convertToApiDateFormat = (dateString: string): string => {
    // yyyyMMdd 형식을 yyyy-MM-dd 형식으로 변환
    const year = dateString.slice(0, 4);   // 첫 4자리: 년도
  const month = dateString.slice(4, 6);  // 5~6자리: 월
  const day = dateString.slice(6, 8);    // 7~8자리: 일

  return `${year}-${month}-${day}`; // yyyy-MM-dd 형식으로 반환
  };
  


export const getSpaceNews = async(today: string) => {
    try {
        const res = await defaultRequest.get(`/news/today/${convertToApiDateFormat(today)}`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("우주 소식 조회 실패", error);
        throw error;
    }
}

export const getSpaceNewsWithContent = async(today:string) => {
    try {
        const formattedDate = convertToApiDateFormat(today);
        const res = await defaultRequest.get(`/news/today/space/contain-preview/${formattedDate}`);
        console.log(res);
        return res.data;  // 우주 소식(내용) 조회
    } catch (error) {
        console.error("우주 소식(내용) 조회 실패", error);
        throw error;
    }
}



export const getPlanetNews = async (today: string, stockName: string) => {
    try {
        const formattedDate = convertToApiDateFormat(today);
        const res = await defaultRequest.get(`/news/today/planet/${formattedDate}/${stockName}`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("행성별 소식 조회 실패", error);
        throw error;
    }
}

export const getPlanetNewsWithContent = async (today: string, stockName: string) => {
    try {
        const formattedDate = convertToApiDateFormat(today);
        const res = await defaultRequest.get(`/news/today/planet/contain-preview/${formattedDate}/${stockName}`);
        console.log(res);
        return res.data;  // ��성별 소식(내용) 조회
    } catch (error) {
        console.error("행성별 소식(내용) 조회 실패", error);
        throw error;
    }
}

// 뉴스 상세 조회
export const getNewsDetail = async (id: number) => {
    try {
        const res = await defaultRequest.get(`/news/${id}`);
        console.log(res);
        return res.data;  // 뉴스 상세 정보 반환
    } catch (error) {
        console.error("뉴스 상세 조회 실패", error);
        throw error;
    }
};

