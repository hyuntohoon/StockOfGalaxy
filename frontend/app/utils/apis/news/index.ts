import { defaultRequest } from "../request";
import axios from 'axios';

export const summarizeNews = async (sentences: string[]) => {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GPT_API_KEY}`, // 환경 변수 확인
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that summarizes news articles in a way that even beginners in stocks or news can easily understand. The summary should be concise, in Korean, and free of any additional explanations."
            },
            {
              role: "user",
              content: `다음 뉴스 내용을 주식이나 뉴스를 처음 접하는 사람도 쉽게 이해할 수 있도록 핵심만 요약해 주세요. 부수적인 설명 없이 오직 요약만 포함해주세요: \n\n${sentences.join(" ")}`
            }
          ],
          temperature: 0.5 // 요약 결과의 일관성을 높이기 위해 낮은 temperature 설정
        }),
      });
  
      const responseData = await response.json();
      return responseData.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error summarizing news:', error);
      return '요약 실패';
    }
  };
  
  
// export const summarizeNews = async (sentences: string[]) => {
//     try {
//       // sentences 배열의 첫 5문장만 사용
//       const limitedSentences = sentences.slice(0, 5).join(" ");
  
//       const response = await axios.post(
//         'https://api.openai.com/v1/chat/completions',
//         {
//           model: "gpt-3.5-turbo", // GPT 모델 선택
//           messages: [
//             {
//               role: "system",
//               content: "You are a helpful assistant that summarizes news articles concisely and in Korean, without any additional explanation."
//             },
//             {
//               role: "user",
//               content: `다음 뉴스 내용을 한국어로 요약해 주세요. 부수적인 설명 없이 오직 요약만 포함해주세요: \n\n${limitedSentences}`
//             }
//           ],
//           max_tokens: 200, // 요약 결과의 길이를 설정합니다.
//           temperature: 0.7
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${GPT_KEY}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       return response.data.choices[0].message.content;
//     } catch (error) {
//       console.error('Error summarizing news:', error);
//       return "요약 실패";
//     }
//   };
  


const convertToApiDateFormat = (dateString: string): string => {
  // yyyyMMdd 형식을 Date 객체로 변환
  const year = parseInt(dateString.slice(0, 4));   // 첫 4자리: 년도
  const month = parseInt(dateString.slice(4, 6)) - 1; // 5~6자리: 월 (0부터 시작)
  const day = parseInt(dateString.slice(6, 8));   // 7~8자리: 일

  // Date 객체 생성
  const date = new Date(year, month, day);

  // 하루 더하기
  date.setDate(date.getDate() + 1);

  // yyyy-MM-dd 형식으로 변환
  const updatedYear = date.getFullYear();
  const updatedMonth = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const updatedDay = String(date.getDate()).padStart(2, '0'); // 일은 1~31 사이의 숫자

  return `${updatedYear}-${updatedMonth}-${updatedDay}`;
};
  
export const searchNewsWithTitle = async(keyword: string, page: number, size: number) => {
    try {
        const res = await defaultRequest.get(`/news/search/title?keyword=${keyword}&page=${page}&size=${size}`);
        console.log(res);
       
        return res.data.map((newsItem: any) => ({
            newsId: newsItem.newsId,
            title: newsItem.title,
            publishedDate: newsItem.publishedDate,
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
        
        // 응답이 배열이므로 첫 번째 요소의 keyword에 접근
        const keywordsData = res.data[0]?.keyword; 

        // keyword 데이터가 있는지 확인 후 변환
        if (keywordsData) {
            const keywords = Object.keys(keywordsData).map(key => ({
                text: key,         // 키워드
                value: keywordsData[key]/10, // 빈도수
            }));
        
            return keywords;
        } else {
            throw new Error("키워드 데이터가 없습니다.");
        }
    } catch (error) {
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

