import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { News, NewsDetail } from '@/app/types/planet';
import { getNewsDetail, getPlanetNewsWithContent, summarizeNews } from '@/app/utils/apis/news';
import { useDate } from '@/app/store/date';
import { useRouter } from 'next/navigation'; // useRouter 임포트


interface NewsModalProps {
  news: NewsDetail;
  onClose: () => void;
  stockName: string;
  setSelectedNews: (news: NewsDetail | null) => void; // 새로운 뉴스 설정 함수
}

// 모달 배경
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000001;
`;

// 모달 컨테이너
const ModalContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  width: 65vw;
  padding: 60px 5%;
  position: relative;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  z-index: 100000000001;

  /* 스크롤바 스타일 추가 */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.1);
`;

// 뉴스 이미지 스타일
const NewsImage = styled.img`
  width: 60%;
  height: auto;
  display: block;
  border-radius: 8%;
  margin: 15px auto 20px;
  padding: 0 30px;
`;

// 뉴스 제목
const NewsTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
`;

// 키워드 스타일
const KeywordChips = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const KeywordChip = styled.span`
  background-color: #ececec;
  border-radius: 15px;
  padding: 10px 20px;
  margin-right: 10px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #dcdcdc;
  }
`;
// AI 요약 버튼
const AiSummaryButton = styled.button`
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: bold;
  &:hover {
    background-color: #3700b3;
  }
`;

// 링크 버튼
const OriginalLinkButton = styled.a`
  background-color: #1e88e5;
  color: white;
  text-decoration: none;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 1rem;
  text-align: center;
  display: block;
  margin: 20px auto 0;
  width: 50%;
  &:hover {
    background-color: #1565c0;
  }
`;

// 닫기 버튼
const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

// 뉴스 본문 (문단으로 나타냄)
const NewsContent = styled.div`
  margin-top: 20px;
  font-size: 1rem;
  line-height: 1.6;

  p {
    margin-bottom: 10px;
  }
`;

// 수평선
const HorizontalLine = styled.hr`
  border: 0.5px solid #ccc;
  margin: 30px 0;
`;

// AI 요약 결과 스타일 (연보라색 배경)
const AiSummary = styled.div`
  background-color: #e6e6fa;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

// 로딩 애니메이션 스타일
const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #6200ea;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  animation: spin 1s linear infinite;
  margin: 0px auto 10px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// 관련 뉴스 리스트
const RelatedNewsContainer = styled.div`
  margin-top: 40px;
`;

// 뉴스 카드
const NewsCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;

// 뉴스 카드 이미지
const NewsCardImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  margin-right: 10px;
`;

// 뉴스 카드 내용
const NewsCardContent = styled.div`
  flex: 1;
`;

// 뉴스 카드 제목
const NewsCardTitle = styled.h4`
  font-size: 1.2rem;
  margin: 0 0 10px 0;
`;

// 뉴스 카드 요약
const NewsCardSummary = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const NewsModal: React.FC<NewsModalProps> = ({ news, onClose, stockName, setSelectedNews }) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { date } = useDate();
  const [planetNews, setPlanetNews] = useState<News[]>([]);

  const router = useRouter(); // useRouter 사용

  // AI 요약 버튼 클릭 핸들러
  const handleAiSummaryClick = async () => {
    if (summary) {
      setShowSummary(!showSummary);
      return;
    }

    setLoading(true);
    try {
      const result = await summarizeNews(news.sentences);
      setSummary(result);
    } catch (error) {
      console.error("Error summarizing news:", error);
    } finally {
      setLoading(false);
      setShowSummary(true);
    }
  };

  // 관련 뉴스 클릭 시
  const handleRelatedNewsClick = async (item: News) => {
    
    try {
      console.log(item)
      const newsDetail = await getNewsDetail(item.newsId);
      setSelectedNews(newsDetail);
    } catch (error) {
      console.error("Error fetching news detail:", error);
    }
    const modalContainer = document.getElementById('modal-container');
    if (modalContainer) {
      modalContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 관련 뉴스 가져오기
  useEffect(() => {
    const fetchSpaceNews = async () => {
      try {
        const res = await getPlanetNewsWithContent(date, stockName);
        setPlanetNews(res);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };
    fetchSpaceNews();
  }, [date, stockName]);

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer id="modal-container" onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>

        <NewsTitle>{news.title}</NewsTitle>

        <KeywordChips>
          <div>
            {news.keywords &&
              news.keywords.map((keyword, idx) => (
                <KeywordChip key={idx}>
                  {keyword}
                </KeywordChip>
              ))}
          </div>
          <AiSummaryButton onClick={handleAiSummaryClick}>
            {showSummary ? "AI 요약 닫기" : "AI 뉴스 요약"}
          </AiSummaryButton>
        </KeywordChips>

        <HorizontalLine />
        {loading && <LoadingSpinner />} {/* 요약 중일 때 로딩 애니메이션 표시 */}
        {showSummary && <AiSummary>{summary || "요약 결과가 없습니다."}</AiSummary>}

          {news.thumbnailImg !== "이미지 없음" && <NewsImage src={news.thumbnailImg}  alt={news.title} />}

        <NewsContent>
          {news.sentences &&
            news.sentences.map((sentence, index) => (
              <p key={index}>{sentence}</p>
            ))}
        </NewsContent>
        <HorizontalLine />

        <OriginalLinkButton href={news.newsLink} target="_blank" rel="noopener noreferrer">
          원본 링크로 이동
        </OriginalLinkButton>

        {/* 관련 뉴스 표시 */}
        <RelatedNewsContainer>
          <h3>{stockName} 관련 뉴스</h3>
          {planetNews.map((item) => (
            <NewsCard key={item.newsId} onClick={() => handleRelatedNewsClick(item)}>
              <NewsCardImage src={item.thumbnailImg === "이미지 없음" ? "/images/default.jpg" : item.thumbnailImg}  alt={item.title} />
              <NewsCardContent>
                <NewsCardTitle>{item.title}</NewsCardTitle>
                <NewsCardSummary>{item.content}</NewsCardSummary>
              </NewsCardContent>
            </NewsCard>
          ))}
        </RelatedNewsContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default NewsModal;
