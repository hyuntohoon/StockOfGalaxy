import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import RocketInputField from '../../atoms/InputField/RocketInputField';
import RocketCard from '../RocketCard';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import { getRocketListApi } from '@/app/utils/apis/rocket';
import { useParams } from 'next/navigation';
import { getTodayDate } from '@/app/utils/libs/getTodayDate';
import useKRStockWebSocket from '@/app/hooks/useKRStockWebSocket';
import { getCurrentPrice } from '@/app/utils/apis/stock/getStockData';
import { useDate } from '@/app/store/date';
import { calculatePriceChange } from '@/app/utils/libs/stock/calculatePriceChange';

const RocketModal = ({ onClose, fetchRocketData }) => { 
  const [data, setData] = useState([]); // 현재 보여주는 데이터
  const [allData, setAllData] = useState([]); // 전체 데이터를 저장할 상태
  const [loading, setLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<string | null>(null); // 주가 정보 상태
  const [maxPositiveRocket, setMaxPositiveRocket] = useState(null); // 양수 중 가장 큰 값
  const [maxNegativeRocket, setMaxNegativeRocket] = useState(null); // 음수 중 가장 큰 값

  const stockCodeParam = useParams().stock;
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;
  const { date } = useDate();
  const realDate = getTodayDate();
  const isToday = date === realDate;

  // 주가 데이터를 가져오는 함수
  const fetchCurrentPrice = async () => {
    try {
      const priceData = await getCurrentPrice(stockCode);
      if (priceData) {
        setCurrentPrice(priceData.stckPrpr); // API로 받은 주가 업데이트
      }
    } catch (error) {
      console.error("현재 주가 정보를 가져오는 중 오류 발생:", error);
    }
  };

  useKRStockWebSocket([{ stock_code: stockCode }], (data) => {
    if (data && data.currentPrice) {
      setCurrentPrice(data.currentPrice);
    }
  });

  useEffect(() => {
    if (!currentPrice) {
      fetchCurrentPrice(); // 웹소켓에서 데이터를 받지 못한 경우 API 호출
    }
  }, [stockCode, currentPrice]);

  // 로켓 데이터를 가져오는 함수
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getRocketListApi(stockCode);
      const rocketList = response.rocketList;

      // currentPrice가 로드되지 않은 경우 대기
      if (!currentPrice || !rocketList.length) {
        setLoading(false);
        return; 
      }

      // 양수 중 가장 큰 값 찾기
      const maxPositive = rocketList.reduce((prev, curr) => {
        const { priceChangeSign, priceChange } = calculatePriceChange(curr.price, currentPrice);
        if (priceChangeSign === '+' && (!prev || priceChange > prev.priceChange)) {
          return { ...curr, priceChange }; // 양수 중 가장 큰 값
        }
        return prev;
      }, null);

      // 음수 중 가장 큰 값 찾기
      const maxNegative = rocketList.reduce((prev, curr) => {
        const { priceChangeSign, priceChange } = calculatePriceChange(curr.price, currentPrice);
        if (priceChangeSign === '-' && (!prev || priceChange > prev.priceChange)) {
          return { ...curr, priceChange }; // 음수 중 가장 큰 값
        }
        return prev;
      }, null);

      setMaxPositiveRocket(maxPositive);
      setMaxNegativeRocket(maxNegative);

      const remainingData = rocketList.filter(
        (rocket) => rocket.rocketId !== maxPositive?.rocketId && rocket.rocketId !== maxNegative?.rocketId
      );
      
      // maxPositive와 maxNegative가 null인 경우 필터링
      const validData = [maxPositive, maxNegative, ...remainingData].filter(Boolean);

      setAllData(validData); // 유효한 데이터만 설정
      setData(validData.slice(0, 8)); // 초기 8개 데이터만 보여줌
    } catch (err) {
      console.error('로켓 데이터를 불러오는 중 에러가 발생했습니다.', err);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    if (currentPrice) { // currentPrice가 유효할 때만 fetchData 호출
      fetchData();
    }
  }, [stockCode, currentPrice]);

  const fetchMoreData = useCallback(() => {
    if (data.length >= allData.length || loading) { // 모든 데이터를 불러왔거나 로딩 중이면 중단
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const additionalData = allData.slice(data.length, data.length + 8); // 다음 8개 데이터 추가
      setData(prevData => [...prevData, ...additionalData]); // 기존 데이터 + 추가 데이터
      setLoading(false);
    }, 1500);
  }, [data, allData, loading]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !loading) {
      fetchMoreData();
    }
  }, [fetchMoreData, loading]);

  // Modal 외부 클릭시 닫힘 처리
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // 모달 외부 클릭시 닫기
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}> {/* 외부 클릭시 모달 닫기 */}
      <ModalWrapper onClick={(e) => e.stopPropagation()}> {/* 내부 클릭시 이벤트 중단 */}
        <ModalTitle>로켓 모아보기</ModalTitle>
        <ModalContent onScroll={handleScroll}>
          <Header>
            <RocketInputField
              currentPrice={currentPrice}
              isToday={isToday}
              fetchRocketData={fetchRocketData}
              fetchRocketListData={fetchData}
            />
          </Header>
          <CardsContainer>
            {data.map((item) => (
              <RocketCard
                key={item.rocketId}
                data={item}
                currentPrice={currentPrice}
                fetchData={fetchData}
                isMaxPositive={item.rocketId === maxPositiveRocket?.rocketId}
                isMaxNegative={item.rocketId === maxNegativeRocket?.rocketId}
              />
            ))}
          </CardsContainer>
        </ModalContent>
        {loading && <LoadingSpinner />}
      </ModalWrapper>
    </ModalOverlay>
  );
};

// 스타일 정의
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  z-index: 2100;
  position: relative;
`;

const ModalTitle = styled.div`
  font-size: 24px;
  margin-left: 10px;
  font-weight: bold;
  color: white;
  text-align: left;
  margin-bottom: 20px;
`;

const ModalContent = styled.div`
  background: rgb(238, 238, 238);
  padding-inline: 50px;
  padding-bottom: 50px;
  border-radius: 20px;
  width: 1030px;
  height: 565px;
  overflow-y: auto;
  position: relative;
  justify-items: center;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #202938;
    border-radius: 20px;
    transition: background-color 0.3s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #20293884;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  grid-gap: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  top: 0;
  background-color: rgb(238, 238, 238);
  z-index: 10;
`;


export default RocketModal;
