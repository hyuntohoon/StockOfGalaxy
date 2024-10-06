'use client'

/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback, useRef } from 'react';
import {
    SearchContainer, 
    SearchInputWrapper, 
    SearchInput, 
    SearchIcon, 
    TabsContainer, 
    Tab, 
    SearchResultsContainer, 
    SearchItem, 
    // StockPrice, 
    NewsDescription, 
    NoResults, 
    NewsInfo
} from '@/app/styles/search';
import { stockData } from '@/app/mocks/stockData';
import useKRStockWebSocket from '@/app/hooks/useKRStockWebSocket';
import formatPrice from '@/app/utils/apis/stock/formatPrice';
import styled from '@emotion/styled';
import { format } from 'path';
import { News } from '@/app/types/planet';
import NewsModal from '@/app/components/templates/planet/NewsModal';
import { searchNewsWithTitle } from '@/app/utils/apis/news';
import SpaceBackGround from '@/app/components/organisms/SpaceBackground';

const StockPriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* 각 항목 사이에 여백을 줍니다 */
`;

const StockPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: white; /* 기본 텍스트 색상 */
`;

const ChangePrice = styled.span<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? '#FF4500' : '#1E90FF')}; /* 빨간색과 파란색 */
  font-weight: bold;
`;

const ChangeRate = styled.span<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? '#FF4500' : '#1E90FF')}; /* 빨간색과 파란색 */
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
    const [activeTab, setActiveTab] = useState('stock'); // 'stock' or 'news'
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false); // 검색 버튼(엔터)을 눌렀을 때만 true
    const [stockDataInfo, setStockDataInfo] = useState<stockState[]>(
        stockData.map(stock => ({
            stock_name: stock.stock_name,
            stock_code: stock.stock_code,
            currentPrice: null,
            changePrice: null,
            changeRate: null,
        }))
    );

    const dummyNewsData: News[] = [
        {
          newsId: 26,
          title: "삼성전자, 새로운 갤럭시 출시",
          publishDate: "2024-04-20T10:00:00",
          content: "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
          thumbnailImg: "/images/logo/samsung.png",
        },
        {
          newsId: 27,
          title: "삼성전자, 새로운 갤럭시 출시",
          publishDate: "2024-04-20T10:00:00",
          content: "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
          thumbnailImg: "/images/logo/samsung.png",
        },
        {
            newsId: 28,
            title: "삼성전자, 새로운 갤럭시 출시",
            publishDate: "2024-04-20T10:00:00",
            content: "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
            thumbnailImg: "/images/logo/samsung.png",
          },
          {
            newsId: 29,
            title: "삼성전자, 새로운 갤럭시 출시",
            publishDate: "2024-04-20T10:00:00",
            content: "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
            thumbnailImg: "/images/logo/samsung.png",
          },
          {
            newsId: 30,
            title: "삼성전자, 새로운 갤럭시 출시",
            publishDate: "2024-04-20T10:00:00",
            content: "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
            thumbnailImg: "/images/logo/samsung.png",
          },
          {
            newsId: 31,
            title: "삼성전자, 새로운 갤럭시 출시",
            publishDate: "2024-04-20T10:00:00",
            content: "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
            thumbnailImg: "/images/logo/samsung.png",
          },
      ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      };
    
    // 뉴스 데이터 추가
    const [newsResults, setNewsResults] = useState<News[]>([]);
    const [page, setPage] = useState(0); // 페이지 상태
    const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const observer = useRef<IntersectionObserver | null>(null);
    const lastNewsElementRef = useRef<HTMLDivElement | null>(null); // 마지막 뉴스 항목을 위한 ref
    const [selectedNews, setSelectedNews] = useState<News | null>(null); // 선택된 뉴스 상태
    const [modalOpen, setModalOpen] = useState(false); // 모달 열기 상태

    const handleNewsClick = (news: News) => {
        setSelectedNews(news); // 선택된 뉴스 설정
        setModalOpen(true); // 모달 열기
    };
    // 실시간 데이터 업데이트
    useKRStockWebSocket(stockData, setStockDataInfo);

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setHasSearched(true);
            setHasMore(true);
            setPage(0); // 페이지 초기화
            setNewsResults([]); // 이전 검색 결과 초기화
            fetchNews(0); // 뉴스 데이터 가져오기
        }
    };

    const fetchNews = useCallback(async (currentPage: number) => {
        if (!searchTerm.trim()) return;
        try {
            setIsLoading(true);
            const response = await searchNewsWithTitle(searchTerm, currentPage, 10);
            if (response.length < 10) {
                setHasMore(false); 
            }
            setNewsResults(prev => [...prev, ...response]);
            setIsLoading(false);
        } catch (error) {
            console.error('뉴스 검색 실패:', error);
            setIsLoading(false);
        }
    }, [searchTerm]);

    // 스크롤 시 마지막 뉴스 항목 감지
    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting && hasMore && !isLoading) {
                setPage(prev => prev + 1);
            }
        }, {
            root: null, // 뷰포트 기준으로 설정
            rootMargin: '0px',
            threshold: 1.0 // 요소의 100%가 화면에 나타날 때만 trigger
        });

        if (lastNewsElementRef.current) {
            observer.current.observe(lastNewsElementRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [lastNewsElementRef, hasMore, isLoading]);

    // 페이지 변경 시 새로운 데이터를 가져옵니다.
    useEffect(() => {
        if (page > 0) {
            fetchNews(page);
        }
    }, [page, fetchNews]);

    
    // 검색된 주식 필터링
    const filteredStocks = stockDataInfo.filter(stock => 
        stock.stock_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.stock_code?.includes(searchTerm)
    );


    return (
        <>
        <SpaceBackGround speed={0.001}/>
        <SearchContainer hasSearched={hasSearched}>
            {!hasSearched && (
                <TabsContainer hasSearched={hasSearched}>
                    <Tab active={activeTab === 'stock'} onClick={() => setActiveTab('stock')}>
                        종목
                    </Tab>
                    <Tab active={activeTab === 'news'} onClick={() => setActiveTab('news')}>
                        뉴스
                    </Tab>
                </TabsContainer>
            )}

            <SearchInputWrapper hasSearched={hasSearched}>
                <SearchIcon />
                <SearchInput
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearch} // 엔터 입력 처리
                />
            </SearchInputWrapper>

            {hasSearched && (
                <TabsContainer hasSearched={hasSearched}>
                    <Tab active={activeTab === 'stock'} onClick={() => setActiveTab('stock')}>
                        종목
                    </Tab>
                    <Tab active={activeTab === 'news'} onClick={() => setActiveTab('news')}>
                        뉴스
                    </Tab>
                </TabsContainer>
            )}

            {/* 종목 탭 */}
            {hasSearched && activeTab === 'stock' && filteredStocks.length > 0 && (
                <SearchResultsContainer>
                    {filteredStocks.map((stock, index) => (
                        <SearchItem key={index}>
                            <div>
                                <strong>{stock.stock_name}</strong> ({stock.stock_code})
                            </div>
                            <StockPriceContainer>
                            <StockPrice>{stock.currentPrice ? `${formatPrice(stock.currentPrice)}원` : ''}</StockPrice>
                            
                            {stock.changePrice !== null && (
                                <ChangePrice isPositive={stock.changePrice > 0}>
                                ({stock.changePrice > 0 ? '+' : ''}{formatPrice(stock.changePrice)?.toLocaleString()}원)
                                </ChangePrice>
                            )}

                            {stock.changeRate !== null && (
                                <ChangeRate isPositive={stock.changeRate > 0}>
                                
                                {Math.abs(stock.changeRate)}%
                                </ChangeRate>
                            )}
                            </StockPriceContainer>
                        </SearchItem>
                    ))}
                </SearchResultsContainer>
            )}

            
{hasSearched && activeTab === 'news' && newsResults.length > 0 && (
                <SearchResultsContainer>
                    {newsResults.map((news, index) => {
                        const isLastElement = index === newsResults.length - 1;
                        return (
                            <SearchItem key={index} ref={isLastElement ? lastNewsElementRef : null} onClick={() => handleNewsClick(news)}>
                            <div>
                                <strong>{news.title}</strong>
                                <NewsDescription>{news.content}</NewsDescription>
                                <NewsInfo>{formatDate(news.publishDate)}</NewsInfo>
                            </div>
                        </SearchItem>
                        );
                    })}
                    <div id="observer" style={{ height: '10px' }} ref={lastNewsElementRef}></div>
                </SearchResultsContainer>
            )}
            {/* 결과가 없을 때 */}
            {hasSearched && activeTab === 'stock' && filteredStocks.length === 0 && (
                <NoResults>검색 결과가 없습니다.</NoResults>
            )}
            {/* 뉴스 모달 컴포넌트 추가 */}
            {modalOpen && selectedNews && (
                <NewsModal
                    news={selectedNews}
                    onClose={() => setModalOpen(false)} // 모달 닫기 핸들러
                />
            )}
        </SearchContainer>
        </>
    );
};

export default SearchPage;
