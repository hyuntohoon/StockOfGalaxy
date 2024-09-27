import { defaultRequest } from "../request";

const convertToApiDateFormat = (dateString: string): string => {
    // yyyy.MM.dd 형식을 yyyy-MM-dd 형식으로 변환
    return dateString.replace(/\./g, '-');
  };
  

export const todayNewsApi = async (today: string) => {
    try {
        const formattedDate = convertToApiDateFormat(today);
        const res = await defaultRequest.get(`/news/today`, {
            params: {
                date: formattedDate,  // 날짜를 쿼리 파라미터로 전송
            },
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.error("오늘의 소식 조회 실패", error);
        throw error;
    }
};

export const todayPlanetNewsApi = async (today: string, stock: number) => {
    try {
        const formattedDate = convertToApiDateFormat(today);
        const res = await defaultRequest.get(`/news/today/`, {
            params: {
                date: formattedDate,  
                stock: stock,  
            }
        });
        console.log(res);
        return res.data;
    }catch(error){
        console.error("행성별 소식 조회 실��", error);
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