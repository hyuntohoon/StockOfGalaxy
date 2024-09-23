import { defaultRequest } from "../request";

const convertDateFormat = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const todayNewsApi = async (today: Date) => {
    try {
        const formattedDate = convertDateFormat(today);
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

export const todayPlanetNewsApi = async (today: Date, stock: number) => {
    try {
        const formattedDate = convertDateFormat(today);
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