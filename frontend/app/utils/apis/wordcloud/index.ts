import { defaultRequest } from "../request";


// 날짜 형식 변환 함수
const convertDateFormat = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// 날짜별 주식 뉴스 키워드 빈도수 조회
export const getDailyStockKeywordFrequency = async (date: Date, stockCode?: string) => {
    try {
        const formattedDate = convertDateFormat(date);
        const res = await defaultRequest.get(`/news/keyword-frequency/daily-stock`, {
            params: {
                date: formattedDate,
                stockCode: stockCode || undefined,  // 주식 코드는 선택 사항
            },
        });
        console.log(res);
        return res.data;  // 키워드 빈도수 리스트 반환
    } catch (error) {
        console.error("날짜별 주식 뉴스 키워드 빈도수 조회 실패", error);
        throw error;
    }
};


// 날짜별 뉴스 키워드 빈도수 조회
export const getDailyKeywordFrequency = async (startDate: Date) => {
    try {
        const formattedStartDate = convertDateFormat(startDate);
        const res = await defaultRequest.get(`/news/keyword-frequency/daily`, {
            params: {
                startDate: formattedStartDate,
            },
        });
        console.log(res);
        return res.data;  // 키워드 빈도수 리스트 반환
    } catch (error) {
        console.error("날짜별 뉴스 키워드 빈도수 조회 실패", error);
        throw error;
    }
};

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