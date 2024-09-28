'use client'

/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import {
    SearchContainer, 
    SearchInputWrapper, 
    SearchInput, 
    SearchIcon, 
    TabsContainer, 
    Tab, 
    SearchResultsContainer, 
    SearchItem, 
    StockPrice, 
    NewsDescription, 
    NoResults, 
    NewsInfo
} from '@/app/styles/search';
import { stockData } from '@/app/mocks/stockData';
import useKRStockWebSocket from '@/app/hooks/useKRStockWebSocket';

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

interface newsData {
    title: string;
    description: string;
    source: string;
    date: string;
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

    // 뉴스 데이터 추가
    const [newsResults, setNewsResults] = useState<newsData[]>([
        {
            title: '"삼성전자 주가 계속 갈까요?"',
            description: '고민 깊어진 개미들 [종목+]',
            source: '한국경제',
            date: '2024-09-28',
        },
        {
            title: 'LG에너지솔루션 주가 급등, 배경은?',
            description: '이유 없는 급등? 전기차 시장 확대 때문!',
            source: '머니투데이',
            date: '2024-09-27',
        },
        {
            title: 'SK하이닉스, 반도체 시장 반등 기대',
            description: '공급망 회복으로 인한 매출 증가 예상',
            source: '전자신문',
            date: '2024-09-26',
        },
    ]);

    // 실시간 데이터 업데이트
    useKRStockWebSocket(stockData, setStockDataInfo);

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setHasSearched(true);
        }
    };

    const filteredStocks = stockDataInfo.filter(stock => 
        stock.stock_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        stock.stock_code?.includes(searchTerm)
    );

    const filteredNews = newsResults.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        news.description.toLowerCase().includes(searchTerm.toLowerCase())
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
                            <div>
                                <StockPrice>{stock.currentPrice ? `${stock.currentPrice.toLocaleString()}원` : '정보 없음'}</StockPrice>
                                <span>
                                    {stock.changePrice !== null && (
                                        <>
                                            ({stock.changePrice > 0 ? '+' : ''}{stock.changePrice?.toLocaleString()}원)
                                        </>
                                    )}
                                </span>
                                <span>
                                    {stock.changeRate !== null && (
                                        <>
                                            {stock.changeRate > 0 ? '▲' : '▼'}{Math.abs(stock.changeRate)}%
                                        </>
                                    )}
                                </span>
                            </div>
                        </SearchItem>
                    ))}
                </SearchResultsContainer>
            )}

            {/* 뉴스 탭 */}
            {hasSearched && activeTab === 'news' && filteredNews.length > 0 && (
                <SearchResultsContainer>
                    {filteredNews.map((news, index) => (
                        <SearchItem key={index}>
                            <div>
                                <strong>{news.title}</strong>
                                <NewsDescription>{news.description}</NewsDescription>
                                <NewsInfo>{news.source} - {news.date}</NewsInfo> {/* 뉴스 정보 표시 */}
                            </div>
                        </SearchItem>
                    ))}
                </SearchResultsContainer>
            )}

            {/* 결과가 없을 때 */}
            {hasSearched && activeTab === 'stock' && filteredStocks.length === 0 && (
                <NoResults>검색 결과가 없습니다.</NoResults>
            )}
            {hasSearched && activeTab === 'news' && filteredNews.length === 0 && (
                <NoResults>검색 결과가 없습니다.</NoResults>
            )}
        </SearchContainer>
    );
};

export default SearchPage;
