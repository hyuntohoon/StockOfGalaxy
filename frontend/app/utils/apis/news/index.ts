import { defaultRequest } from "../request";

const convertToApiDateFormat = (dateString: string): string => {
    // yyyyMMdd 형식을 yyyy-MM-dd 형식으로 변환
    const year = dateString.slice(0, 4);   // 첫 4자리: 년도
  const month = dateString.slice(4, 6);  // 5~6자리: 월
  const day = dateString.slice(6, 8);    // 7~8자리: 일

  return `${year}-${month}-${day}`; // yyyy-MM-dd 형식으로 반환
  };
  
export const searchNewsWithTitle = async(keyword: string, page: number, size: number) => {
    try {
        const res = await defaultRequest.get(`/news/search/title?keyword=${keyword}&page=${page}&size=${size}`);
        console.log(res);
       
        return res.data.map((newsItem: any) => ({
            newsId: newsItem.newsId,
            title: newsItem.title,
            publishDate: newsItem.publishedDate,
            thumbnailImg: newsItem.thumbnailImg,
        }));
    } catch (error) {
        console.error("제목으로 검색한 ���스 조회 실��", error);
        throw error;
    }
}

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
        const res = await defaultRequest.get(`/news/today/contain-preview/${formattedDate}`);
        console.log(res);
        return res.data;  // 우주 소식(내용) 조회
    } catch (error) {
        console.error("우주 소식(내용) 조회 실패", error);
        throw error;
    }
}

export const getSpaceKeywords = async(today: string) => {
    try {
        const formattedDate = convertToApiDateFormat(today);
        const res = await defaultRequest.get(`/news/keyword-frequency/daily/${formattedDate}`);
        const keywords = Object.keys(res.data.keyword).map(key => ({
            text: key,         // 키워드
            value: res.data.keyword[key]  // 빈도수
          }));
      
          return keywords; 
    }catch (error) {
        console.error("키워드 조회 실패", error);
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
        const encodedName = stockName ? encodeURIComponent(stockName) : encodeURIComponent("삼성전자");
        const res = await defaultRequest.get(`/news/today/planet/contain-preview/${formattedDate}/${encodedName}`);
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
        console.log(res.data);
        return res.data;  // 뉴스 상세 정보 반환
    } catch (error) {
        console.error("뉴스 상세 조회 실패", error);
        return {
            "newsId": 26,
            "title": "삼성전자, 새로운 갤럭시 출시",
            "content": "삼성전자가 새로운 갤럭시 시리즈를 공개하며 모바일 시장에서의 입지를 강화하고 있습니다.",
            "category": "기술",
            "publishedDate": "2024-04-20T10:00:00",
            "newsLink": "https://example.com/news/1",
            "sentimentIndex": 0.75,
            "thumbnailImg": "/images/logo/samsung.png",
            "newsCreatedAt": "2024-09-29T20:41:07",
            "newsUpdatedAt": "2024-09-29T20:41:07"
        };
    }
};

