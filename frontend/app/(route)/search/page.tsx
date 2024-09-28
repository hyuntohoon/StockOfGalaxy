'use client'

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

// 메인 컨테이너 (페이지 전체를 채움)
const SearchContainer = styled.div<{ hasSearched: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin-top: ${(props) => (props.hasSearched ? '10px' : '15%')};
  padding: 40px 20px;
  color: #ffffff;
  transition: margin-top 0.6s ease-in-out;
`;

const SearchInputWrapper = styled.div<{ hasSearched: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 10px 20px;
  margin-top: ${(props) => (props.hasSearched ? '40px' : '60px')};
  transition: margin-top 0.6s ease-in-out;
`;

const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 18px;
  color: #ffffff;
  padding: 10px;
`;

const SearchIcon = styled(FiSearch)`
  color: #ffffff;
  font-size: 24px;
  margin-right: 10px;
`;

const TabsContainer = styled.div<{ hasSearched: boolean }>`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 100%;
  transition: margin-top 0.6s ease-in-out;
`;

const Tab = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  color: ${(props) => (props.active ? '#0d0d2b' : '#ffffff')};
  border: ${(props) => (props.active ? 'none' : '1px solid rgba(255, 255, 255, 0.2)')};
  border-radius: 20px;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.6s ease, color 0.6s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.1)')};
  }
`;

const SearchResultsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  max-height: 400px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.6s ease-in-out;
`;

const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 15px 20px;
  margin-bottom: 15px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.6s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const StockPrice = styled.span`
  color: #00ffb2;
  font-weight: bold;
`;

const NewsDescription = styled.p`
  color: #bbbbbb;
  margin: 0;
`;

const NoResults = styled.div`
  color: #bbbbbb;
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
`;

// 실제 검색 페이지 컴포넌트
const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('stock'); // 'stocks' or 'news'
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false); // 검색 버튼(엔터)을 눌렀을 때만 true

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setHasSearched(true);

      // 임시로 검색 결과 세팅
      setSearchResults([
        { type: 'stock', name: '삼성전자', code: '005930', price: '64,200원', change: '-0.7%' },
        { type: 'stock', name: '삼성바이오로직스', code: '207940', price: '986,000원', change: '-6.2%' },
        { type: 'news', title: '"삼성전자 주가 계속 갈까요?"', description: '고민 깊어진 개미들 [종목+]', source: '한국경제' },
      ]);
    }
  };

  return (
    <SearchContainer hasSearched={hasSearched}>
      {/* 검색창 위에 탭이 위치 */}
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

      {/* 검색 결과가 있을 때 검색창 아래로 탭 위치 */}
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

      {hasSearched && searchResults.length > 0 && (
        <SearchResultsContainer>
          {searchResults
            .filter((result) => result.type === activeTab)
            .map((result, index) =>
              result.type === 'stock' ? (
                <SearchItem key={index}>
                  <div>
                    <strong>{result.name}</strong> ({result.code})
                  </div>
                  <StockPrice>{result.price}</StockPrice>
                </SearchItem>
              ) : (
                <SearchItem key={index}>
                  <div>
                    <strong>{result.title}</strong>
                    <NewsDescription>{result.description}</NewsDescription>
                  </div>
                </SearchItem>
              )
            )}
        </SearchResultsContainer>
      )}

      {hasSearched && searchResults.length === 0 && <NoResults>검색 결과가 없습니다.</NoResults>}
    </SearchContainer>
  );
};

export default SearchPage;
