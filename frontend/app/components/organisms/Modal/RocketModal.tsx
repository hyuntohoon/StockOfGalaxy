import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { IoClose } from "react-icons/io5";
import RocketInputField from '../../atoms/InputField/RocketInputField';
import RocketCard from '../RocketCard';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import { getRocketListApi } from '@/app/utils/apis/rocket';
import { useParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { getTodayDate } from '@/app/utils/libs/getTodayDate';
import { dateState } from '@/app/store/date';
import { rocketListData } from '@/app/mocks/rocketListData';

const RocketModal = ({ onClose, currentPrice }) => {
  const [data, setData] = useState([]); // 현재 보여주는 데이터
  const [allData, setAllData] = useState([]); // 전체 데이터를 저장할 상태
  const [loading, setLoading] = useState(false);
  const stockCodeParam = useParams().stock;
  const stockCode = Array.isArray(stockCodeParam) ? stockCodeParam[0] : stockCodeParam;
  
  const realDate = getTodayDate(); // 실제 오늘 날짜
  const isToday = date === realDate;

  // fetchData 함수 분리
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getRocketListApi(stockCode); // 전체 데이터를 불러옴
      // const response = rocketListData.rocketList; // todo: api 연동해서 실제 데이터로 변경
      console.log(response);
      setAllData(response); // 전체 데이터를 상태에 저장
      setData(response.slice(0, 8)); // 초기 8개 데이터만 보여줌
    } catch (err) {
      console.error('로켓 데이터를 불러오는 중 에러가 발생했습니다.', err);
    } finally {
      setLoading(false);
    }
  };

  // 처음에 데이터를 불러오는 useEffect
  useEffect(() => {
    fetchData();
  }, [stockCode]);

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

  // handleDelete에서 fetchData 전달
  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalTitle>로켓 모아보기</ModalTitle>
        <ModalContent onScroll={handleScroll}>
          <StyledCloseIcon onClick={onClose}/>
          <Header>
            <RocketInputField currentPrice={currentPrice} isToday={isToday} />  {/* 실시간 주가 전달 */}
          </Header>
          <CardsContainer>
            {data.map((item) => (
              <RocketCard key={item.rocketId} data={item} currentPrice={currentPrice} fetchData={fetchData} />
            ))}
          </CardsContainer>
          {loading && <LoadingSpinner />}
        </ModalContent>
      </ModalWrapper>
    </ModalOverlay>
  );
};

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
  background: rgba(255, 255, 255, 0.9);
  padding-inline: 50px;
  padding-bottom: 50px;
  border-radius: 20px;
  width: 1030px;
  height: 565px;
  overflow-y: auto;
  position: relative;
  justify-items: center;

  /* 스크롤바 커스텀 스타일링 */
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
  gap: 20px;
  justify-content: space-between;
`

const StyledCloseIcon = styled(IoClose)`
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 24px;
  cursor: pointer;
`;

export default RocketModal;
