import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { News, NewsDetail } from "@/app/types/planet";
import {
  getNewsDetail,
  getPlanetNewsWithContent,
  summarizeNews,
} from "@/app/utils/apis/news";
import { useDate } from "@/app/store/date";
import { useRouter } from "next/navigation"; // useRouter 임포트
import useKRStockWebSocket from "@/app/hooks/useKRStockWebSocket";
import { stockData } from "@/app/mocks/stockData";
import { stockNumbers } from "@/app/utils/libs/stockNumbers";
import { findStockName } from "@/app/utils/apis/stock/findStockName";
import formatPrice from "@/app/utils/apis/stock/formatPrice";
import { getCurrentPrice } from "@/app/utils/apis/stock/getStockData";

interface NewsModalProps {
  news: NewsDetail;
  onClose: () => void;
  stockName: string;
  isVisible: boolean;
  setSelectedNews: (news: NewsDetail | null) => void; // 새로운 뉴스 설정 함수
}
const StockKeywordChip = styled.div`
  display: inline-flex;
  align-items: center; /* 수평으로 정렬 */
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

const StockName = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 10px; /* 주식명과 가격 정보 사이의 간격 */
`;

const StockPriceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StockPrice = styled.span`
  font-size: 1rem; /* 글씨를 조금 작게 설정 */
  color: black;
  font-weight: bold;
`;

const ChangePrice = styled.span<{ isPositive: boolean }>`
  font-size: 0.9rem; /* 글씨를 조금 작게 설정 */
  color: ${({ isPositive }) => (isPositive ? "#FF4500" : "#1E90FF")};
  font-weight: bold;
`;

const ChangeRate = styled.span<{ isPositive: boolean }>`
  font-size: 0.9rem; /* 글씨를 조금 작게 설정 */
  color: ${({ isPositive }) => (isPositive ? "#FF4500" : "#1E90FF")};
  font-weight: bold;
`;

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

import { keyframes } from "@emotion/react";

// 모달 등장 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 모달 사라지는 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-50px);
  }
`;

const ModalContainer = styled.div<{ isVisible: boolean }>`
  background-color: white;
  color: black;
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

  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 1s ease;
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

interface stockState {
  stock_name: string;
  stock_code: string;
  currentPrice: number;
  changePrice: number;
  changeRate: number;
}

const NewsModal: React.FC<NewsModalProps> = ({
  news,
  onClose,
  stockName,
  setSelectedNews,
  isVisible,
}) => {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { date } = useDate();
  const [planetNews, setPlanetNews] = useState<News[]>([]);
  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>(
    () =>
      news?.keywords
        ?.slice(0, 3)
        .map((keyword) => {
          const stockCode = stockNumbers[keyword]; // stockNumbers에서 keyword에 해당하는 value 찾기

          // stockCode가 있으면 findStockName으로 종목 이름을 찾고 state에 할당
          if (stockCode) {
            return {
              stock_name: keyword, // 종목 이름을 할당
              stock_code: stockCode, // 종목 코드를 할당
              currentPrice: null,
              changePrice: null,
              changeRate: null,
            };
          } else {
            return null; // 해당하는 종목이 없을 경우 null로 처리
          }
        })
        .filter((item) => item !== null) || [] // keywords가 없을 때 빈 배열 처리
  );

  useEffect(() => {
    const initializeStockPrices = async () => {
      const updatedStockDataInfo = await Promise.all(
        stockDataInfo.map(async (stock) => {
          const res = await getCurrentPrice(stock.stock_code);
          return {
            ...stock,
            currentPrice: parseInt(res.stckPrpr),
            changePrice: parseInt(res.prdyVrss),
            changeRate: parseFloat(res.prdyCtrt),
          };
        })
      );
      setStockDataInfo(updatedStockDataInfo);
    };

    initializeStockPrices();
  }, []);

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
  useKRStockWebSocket(stockDataInfo, setStockDataInfo);
  // 관련 뉴스 클릭 시
  const handleRelatedNewsClick = async (item: News) => {
    try {
      console.log(item);
      const newsDetail = await getNewsDetail(item.newsId);
      setSelectedNews(newsDetail);
      setSummary(null);
      setShowSummary(false);
      setStockDataInfo(
        () =>
          news?.keywords
            ?.map((keyword) => {
              const stockCode = stockNumbers[keyword]; // stockNumbers에서 keyword에 해당하는 value 찾기

              // stockCode가 있으면 findStockName으로 종목 이름을 찾고 state에 할당
              if (stockCode) {
                return {
                  stock_name: keyword, // 종목 이름을 할당
                  stock_code: stockCode, // 종목 코드를 할당
                  currentPrice: null,
                  changePrice: null,
                  changeRate: null,
                };
              } else {
                return null; // 해당하는 종목이 없을 경우 null로 처리
              }
            })
            .filter((item) => item !== null) || [] // keywords가 없을 때 빈 배열 처리
      );
    } catch (error) {
      console.error("Error fetching news detail:", error);
    }
    const modalContainer = document.getElementById("modal-container");
    if (modalContainer) {
      modalContainer.scrollTo({ top: 0, behavior: "smooth" });
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
      <ModalContainer
        id="modal-container"
        onClick={(e) => e.stopPropagation()}
        isVisible={isVisible}
      >
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <NewsTitle>{news.title}</NewsTitle>
        <KeywordChips>
          <div>
            {stockDataInfo &&
              stockDataInfo.map((stock, idx) => (
                <StockKeywordChip key={idx}>
                  <StockName>{stock.stock_name}</StockName>
                  <StockPriceInfo>
                    <StockPrice>
                      {stock.currentPrice
                        ? `${formatPrice(stock.currentPrice)}원`
                        : "000,000원"}
                    </StockPrice>

                    {stock.changeRate ? (
                      <ChangeRate isPositive={stock.changeRate > 0}>
                        ({stock.changePrice > 0 ? "+" : ""}
                        {Math.abs(stock.changeRate)}%)
                      </ChangeRate>
                    ) : (
                      <ChangeRate isPositive={true}>+0.0%</ChangeRate>
                    )}
                  </StockPriceInfo>
                </StockKeywordChip>
              ))}
          </div>
          <AiSummaryButton onClick={handleAiSummaryClick}>
            {showSummary ? "AI 요약 닫기" : "AI 뉴스 요약"}
          </AiSummaryButton>
        </KeywordChips>
        <HorizontalLine />
        {loading && <LoadingSpinner />}{" "}
        {/* 요약 중일 때 로딩 애니메이션 표시 */}
        {showSummary && (
          <AiSummary>{summary || "요약 결과가 없습니다."}</AiSummary>
        )}
        {news.thumbnailImg !== "이미지 없음" && (
          <NewsImage src={news.thumbnailImg} alt={news.title} />
        )}
        <NewsContent>
          {news.sentences &&
            news.sentences.map((sentence, index) => (
              <p key={index}>{sentence}</p>
            ))}
        </NewsContent>
        <HorizontalLine />
        <OriginalLinkButton
          href={news.newsLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          원본 링크로 이동
        </OriginalLinkButton>
        {/* 관련 뉴스 표시 */}
        <RelatedNewsContainer>
          <h3>{stockName} 관련 뉴스</h3>
          {planetNews.map((item) => (
            <NewsCard
              key={item.newsId}
              onClick={() => handleRelatedNewsClick(item)}
            >
              <NewsCardImage
                src={
                  item.thumbnailImg === "이미지 없음"
                    ? "/images/default.jpg"
                    : item.thumbnailImg
                }
                alt={item.title}
              />
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
