import styled from '@emotion/styled';
import { FiSearch } from 'react-icons/fi';

export const SearchContainer = styled.div<{ hasSearched: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  margin-top: ${(props) => (props.hasSearched ? '10px' : '15%')};
  padding: 40px 20px;
  color: #ffffff;
  transition: margin-top 0.4s ease-in-out;
`;

export const SearchInputWrapper = styled.div<{ hasSearched: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 12px 24px;
  margin-top: ${(props) => (props.hasSearched ? '30px' : '50px')};
  transition: margin-top 0.4s ease-in-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  font-size: 16px;
  color: #ffffff;
  padding: 10px;
`;

export const SearchIcon = styled(FiSearch)`
  color: #ffffff;
  font-size: 22px;
  margin-right: 10px;
`;

export const TabsContainer = styled.div<{ hasSearched: boolean }>`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  transition: margin-top 0.4s ease-in-out;
`;

export const Tab = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  color: ${(props) => (props.active ? '#141e30' : '#ffffff')};
  border: ${(props) => (props.active ? 'none' : '1px solid rgba(255, 255, 255, 0.2)')};
  border-radius: 20px;
  padding: 8px 16px;
  margin: 0 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.4s ease, color 0.4s ease;

  &:hover {
    background-color: ${(props) => (props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.1)')};
  }
`;

export const SearchResultsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  max-height: 400px;
  overflow-y: auto;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  transition: all 0.4s ease-in-out;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3); /* 스크롤바 색상 */
    border-radius: 4px; /* 스크롤바 둥글게 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.6); /* 스크롤바 호버 시 색상 */
  }
`;

export const SearchItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 10px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.4s ease, transform 0.4s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

export const StockPrice = styled.span`
  color: #00ffa5;
  font-weight: bold;
  font-size: 14px;
`;

export const NewsDescription = styled.p`
  color: #bbbbbb;
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`;

export const NewsInfo = styled.div`
  font-size: 13px;
  color: #bbbbbb;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
`;

export const NoResults = styled.div`
  color: #bbbbbb;
  text-align: center;
  margin-top: 20px;
  font-size: 15px;
  z-index: 100000;
`;
