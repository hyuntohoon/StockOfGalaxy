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
    NewsDescription, 
    NoResults, 
    NewsInfo
} from '@/app/styles/search';
import { stockData } from '@/app/mocks/stockData';
import useKRStockWebSocket from '@/app/hooks/useKRStockWebSocket';
import formatPrice from '@/app/utils/apis/stock/formatPrice';
import styled from '@emotion/styled';
import { News } from '@/app/types/planet'
import { searchNewsWithTitle } from '@/app/utils/apis/news';
import { useRouter } from 'next/navigation';

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
  color: ${({ isPositive }) => (isPositive ? '#FF4500' : '#1E90FF')};
  font-weight: bold;
`;

const ChangeRate = styled.span<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? '#FF4500' : '#1E90FF')};
  font-weight: bold;
`;

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState<'stock' | 'news'>('stock');
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSearched, setHasSearched] = useState(false);
    const [stockDataInfo, setStockDataInfo] = useState(
        stockData.map(stock => ({
            stock_name: stock.stock_name,
            stock_code: stock.stock_code,
            currentPrice: null,
            changePrice: null,
            changeRate: null,
        }))
    );
    const router = useRouter();

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
    
    const [newsResults, setNewsResults] = useState<News[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastNewsElementRef = useRef<HTMLDivElement | null>(null);
    
    useKRStockWebSocket(stockData, setStockDataInfo);

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setHasSearched(true);
            setPage(0);
            setNewsResults([]);
            fetchNews(); 
        }
    };

    const fetchNews = useCallback(async () => {
        if (!searchTerm.trim() || isLoading) return; // 로딩 중일 때 중복 호출 방지
        setIsLoading(true);
        try {
            const response = await searchNewsWithTitle(searchTerm, page, 10);
            if (response.length) {
                console.log("success")
                setNewsResults(prev => [...prev, ...response]); // 이전 데이터에 새 데이터 추가
                setHasMore(true); // 마지막 페이지인지 여부
            } else {
                console.log("fail")

                setNewsResults(dummyNewsData);
                setHasMore(false);
            }
        } catch (error) {
            console.error('뉴스 검색 실패:', error);
        } finally {
            setIsLoading(false);
        }
    }, [searchTerm, page, isLoading]);

    useEffect(() => {
        console.log("scroll");
        if (observer.current) observer.current.disconnect();
        
        // rootMargin을 이용해 요소가 화면에 들어오기 직전에 감지되도록 설정
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !isLoading) {
                setPage(prev => prev + 1);
            }
        }, {
            rootMargin: '100px' // 100px 전에 미리 감지되도록 설정
        });
    
        if (lastNewsElementRef.current) {
            observer.current.observe(lastNewsElementRef.current);
        }
    
        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [lastNewsElementRef, hasMore, isLoading]);
    

    const filteredStocks = stockDataInfo.filter(stock => 
        stock.stock_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.stock_code?.includes(searchTerm)
    );

    return (
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

            {/* 뉴스 탭 */}
            {hasSearched && activeTab === 'news' && newsResults.length > 0 && (
                <SearchResultsContainer>
                    {newsResults.map((news, index) => {
                        const isLastElement = index === newsResults.length - 1;
                        return (
                            <SearchItem 
                            onClick={()=>{router.push(`/news/${news.newsId}`)}}
                            key={index} ref={isLastElement ? lastNewsElementRef : null}>
                                <div>
                                    <strong>{news.title}</strong>
                                    <NewsDescription>{news.content}</NewsDescription>
                                    <NewsInfo>{formatDate(news.publishDate)}</NewsInfo>
                                </div>
                            </SearchItem>
                        );
                    })}
                </SearchResultsContainer>
            )}

            {hasSearched && activeTab === 'stock' && filteredStocks.length === 0 && (
                <NoResults>검색 결과가 없습니다.</NoResults>
            )}
        </SearchContainer>
    );
};

export default SearchPage;
