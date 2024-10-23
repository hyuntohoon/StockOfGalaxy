import { defaultRequest } from "../request";


// 날짜 형식 변환 함수
const convertDateFormat = (date: string): string => {
    return date.replace(/\./g, '-');
};


// 날짜별 주식 뉴스 키워드 빈도수 조회
export const getDailyStockKeywordFrequency = async (date: string, stockCode?: string) => {
    try {
        const formattedDate = convertDateFormat(date);  // ���� 형식 변환
        const res = await defaultRequest.get(`/news/keyword-frequency/daily-stock`, {
            params: {
                date : formattedDate,  // 이미 문자열로 날짜를 받음
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
export const getDailyKeywordFrequency = async (startDate: string) => {
    try {
        const formattedDate = convertDateFormat(startDate);
        const res = await defaultRequest.get(`/news/keyword-frequency/daily`, {
            params: {
                startDate : formattedDate,  // 이미 문자열로 시작 날짜를 받음
            },
        });
        console.log(res);
        return res.data;  // 키워드 빈도수 리스트 반환
    } catch (error) {
        console.error("날짜별 뉴스 키워드 빈도수 조회 실패", error);
        throw error;
    }
};
