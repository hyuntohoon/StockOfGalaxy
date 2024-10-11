"use client";
export const dynamic = "force-dynamic";

/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback, useRef } from "react";
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
  TabsContainer,
  Tab,
  SearchResultsContainer,
  SearchItem,
  NewsDescription,
  NoResults,
  NewsInfo,
} from "@/app/styles/search";
import { useRouter } from "next/navigation";
import { stock_list } from "@/app/utils/apis/stock/findStockName";
import useKRStockWebSocket from "@/app/hooks/useKRStockWebSocket";
import formatPrice from "@/app/utils/apis/stock/formatPrice";
import styled from "@emotion/styled";
import { News, NewsDetail } from "@/app/types/planet";
import NewsModal from "@/app/components/templates/planet/NewsModal";
import { searchNewsWithTitle } from "@/app/utils/apis/news";
import { getNewsDetail } from "@/app/utils/apis/news";
import { getCurrentPrice } from "@/app/utils/apis/stock/getStockData";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const StockPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StockPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const ChangePrice = styled.span<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? "#FF4500" : "#1E90FF")};
  font-weight: bold;
`;

const ChangeRate = styled.span<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? "#FF4500" : "#1E90FF")};
  font-weight: bold;
`;

interface stockData {
  stock_name: string;
  stock_code: string;
}

interface stockState {
  stock_name: string | null;
  stock_code: string | null;
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

const SearchPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("stock");

  const [stockDataInfo, setStockDataInfo] = useState<stockState[]>(
    stock_list.map((stock) => ({
      stock_name: stock.stock_name,
      stock_code: stock.stock_code,
      currentPrice: null,
      changePrice: null,
      changeRate: null,
    }))
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

  const [newsResults, setNewsResults] = useState<News[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastNewsElementRef = useRef<HTMLDivElement | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleNewsClick = async (item: News) => {
    if (item.newsId) {
      try {
        const newsData = await getNewsDetail(Number(item.newsId));
        setSelectedNews(newsData);
      } catch (error) {
        console.error("Error fetching news detail:", error);
      }
    }
    setModalOpen(true);
    setIsVisible(true);
  };

  useEffect(() => {});

  useKRStockWebSocket(stock_list, setStockDataInfo);

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setHasSearched(true);
      setHasMore(true);
      setPage(0);
      setNewsResults([]);
      fetchNews(0);
    }
  };

  const fetchNews = useCallback(
    async (currentPage: number) => {
      if (!searchTerm.trim()) return;
      try {
        setIsLoading(true);
        const response = await searchNewsWithTitle(searchTerm, currentPage, 10);
        if (response.length < 10) {
          setHasMore(false);
        }
        setNewsResults((prev) => [...prev, ...response]);
        setIsLoading(false);
      } catch (error) {
        console.error("뉴스 검색 실패:", error);
        setIsLoading(false);
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !isLoading) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastNewsElementRef.current) {
      observer.current.observe(lastNewsElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [lastNewsElementRef, hasMore, isLoading]);

  useEffect(() => {
    if (page > 0) {
      fetchNews(page);
    }
  }, [page, fetchNews]);

  useEffect(() => {
    if (searchTerm) {
      setHasSearched(true);
      setHasMore(true);
      setPage(0);
      setNewsResults([]);
      fetchNews(0);
    }
  }, [searchTerm]);

  const filteredStocks = stockDataInfo.filter(
    (stock) =>
      stock.stock_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.stock_code?.includes(searchTerm)
  );

  const moveDetailPage = (stock_code: string) => {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    router.push(`/planet/main/${stock_code}/${currentDate}`);
  };

  return (
    <SearchContainer hasSearched={hasSearched}>
      <SearchInputWrapper hasSearched={hasSearched}>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
      </SearchInputWrapper>

      <TabsContainer hasSearched={hasSearched}>
        <Tab
          active={activeTab === "stock"}
          onClick={() => setActiveTab("stock")}
        >
          종목
        </Tab>
        <Tab active={activeTab === "news"} onClick={() => setActiveTab("news")}>
          뉴스
        </Tab>
      </TabsContainer>

      {activeTab === "stock" && filteredStocks.length > 0 && (
        <SearchResultsContainer>
          {!hasSearched && <p>인기 종목</p>}
          {filteredStocks.map((stock, index) => (
            <SearchItem
              key={index}
              onClick={() => moveDetailPage(stock.stock_code)}
            >
              <div>
                <strong>{stock.stock_name}</strong> ({stock.stock_code})
              </div>
              <StockPriceContainer>
                <StockPrice>
                  {stock.currentPrice
                    ? `${formatPrice(stock.currentPrice)}원`
                    : ""}
                </StockPrice>
                {stock.changePrice !== null && (
                  <ChangePrice isPositive={stock.changePrice > 0}>
                    ({stock.changePrice > 0 ? "+" : ""}
                    {formatPrice(stock.changePrice)?.toLocaleString()}원)
                  </ChangePrice>
                )}
                {stock.changeRate !== null && (
                  <ChangeRate isPositive={stock.changeRate > 0}>
                    {Math.abs(stock.changeRate).toFixed(2)}%
                  </ChangeRate>
                )}
              </StockPriceContainer>
            </SearchItem>
          ))}
        </SearchResultsContainer>
      )}

      {activeTab === "news" && newsResults.length > 0 && (
        <SearchResultsContainer>
          {newsResults.map((news, index) => {
            const isLastElement = index === newsResults.length - 1;
            return (
              <SearchItem
                key={index}
                ref={isLastElement ? lastNewsElementRef : null}
                onClick={() => handleNewsClick(news)}
              >
                <div>
                  <strong>{news.title}</strong>
                  <NewsDescription>{news.content}</NewsDescription>
                  <NewsInfo>{formatDate(news.publishedDate)}</NewsInfo>
                </div>
              </SearchItem>
            );
          })}
          <div
            id="observer"
            style={{ height: "10px" }}
            ref={lastNewsElementRef}
          ></div>
        </SearchResultsContainer>
      )}

      {activeTab === "stock" && filteredStocks.length === 0 && (
        <NoResults>검색 결과가 없습니다.</NoResults>
      )}

      {modalOpen && selectedNews && (
        <NewsModal
          news={selectedNews}
          stockName={searchTerm}
          onClose={() =>{
            setIsVisible(false);  // 모달 닫기 애니메이션 시작
            setTimeout(() => {
            setModalOpen(false);
            }, 1500); }
          }
          isVisible={isVisible}
          setSelectedNews={setSelectedNews}
        />
      )}
    </SearchContainer>
  );
};

export default SearchPage;
