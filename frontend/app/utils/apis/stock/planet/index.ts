import { defaultRequest } from "../../request";

export const getStockName = async (stockCode: string) => {
    try {
        const res = await defaultRequest.get(`/stock/${stockCode}/name`);
        return res.data.stockName;
    } catch (error) {
        console.error("종목명 조회 실패", error);
        throw error;
    }
}


// {
//     "stockCode": "005930", //  종목번호
//     "companyName": "삼성전자", // 종목이름
//     "companyDescription": "삼성전자는 대한민국의 대표적인 전자제품 제조 기업으로, 반도체, 디스플레이, 모바일, 가전 등 다양한 사업을 운영하고 있습니다.", // 설명
//     "establishedYear": 1969, // 설립연도
//     "ceo": "이재용", // 대표
//     "webSite": "https://www.samsung.com", // 홈페이지
//     "fiscalMonth": 12, // 결산 월
//     "delisted": false // 상장폐지여부
// }

export const getStockInfo = async (stockCode: string) => {
    try {
        const res = await defaultRequest.get(`/stock/${stockCode}`);
        return res.data;
    } catch (error) {
        console.error("종목 정보 조회 실패", error);
        throw error;
    }
}