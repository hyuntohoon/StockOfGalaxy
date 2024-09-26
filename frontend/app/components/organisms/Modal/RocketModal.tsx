import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { IoClose } from "react-icons/io5";
import RocketInputField from '../../atoms/InputField/RocketInputField';
import RocketCard from '../RocketCard';
import LoadingSpinner from '../../atoms/LoadingSpinner';
import RocketAuthorProfile from '../../molecules/ButtonGroup/RocketAuthorProfile';

// 임시 댓글 데이터
const tempData = [
  {
    userId: 1,
    nickname: '참1',
    price: '715200',
    priceChangeSign: '-',
    priceChange: '0.04',
    message: '응 절대 안 올라 평생 버텨봐~우오오ㅇ아~우오오~우오오~우오오ㅇ아아아아',
    createdAt: "2024.08.29 11:23",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 2,
    nickname: '참2',
    price: '715100',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '절대 안 올라~ 버텨~ 우오오ㅇ아!',
    createdAt: "2024.08.29 12:00",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 3,
    nickname: '참3',
    price: '714200',
    priceChangeSign: '+',
    priceChange: '0.07',
    message: '아무리 기다려도 오르지 않을걸~',
    createdAt: "2024.08.29 12:30",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 4,
    nickname: '참4',
    price: '716200',
    priceChangeSign: '-',
    priceChange: '0.02',
    message: '이거는 진짜 안 올라!',
    createdAt: "2024.08.29 13:00",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 5,
    nickname: '참5',
    price: '715900',
    priceChangeSign: '-',
    priceChange: '0.02',
    message: '버텨봐도 소용없어~',
    createdAt: "2024.08.29 13:30",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 6,
    nickname: '참6',
    price: '715200',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '우오오~ 이건 절대 오르지 않아!',
    createdAt: "2024.08.29 14:00",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 7,
    nickname: '참7',
    price: '715200',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '포기해~ 올라갈 리가 없어!',
    createdAt: "2024.08.29 14:30",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 8,
    nickname: '참8',
    price: '715200',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '이건 진짜 힘들어!',
    createdAt: "2024.08.29 15:00",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 9,
    nickname: '참9',
    price: '715200',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '버텨도 소용없어~!',
    createdAt: "2024.08.29 15:30",
    imageUrl: '/images/rocket/profile2.png'
  },
  {
    userId: 10,
    nickname: '참10',
    price: '715200',
    priceChangeSign: '+',
    priceChange: '0.02',
    message: '이건 절대 안 올라~',
    createdAt: "2024.08.29 16:00",
    imageUrl: '/images/rocket/profile2.png'
  }
];

// 임시 사용자
const tempUser = {
  userId: 1,
  nickname: '참',
  imageUrl: '/images/rocket/profile2.png'
};

const RocketModal = ({ onClose }) => {
  const [data, setData] = useState(tempData.slice(0, 8)); // 초기 8개 데이터 로드
  const [loading, setLoading] = useState(false);

  const fetchMoreData = useCallback(() => {
    if (data.length >= tempData.length || loading) {
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const additionalData = tempData.slice(data.length, data.length + 8); // 다음 8개 데이터 로드
      setData(prevData => [...prevData, ...additionalData]);
      setLoading(false);
    }, 1500);
  }, [data, loading]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !loading) { // 스크롤이 거의 바닥에 도달하면 데이터 로드
      fetchMoreData();
    }    
  }, [fetchMoreData, loading]);

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalTitle>로켓 모아보기</ModalTitle>
        <ModalContent onScroll={handleScroll}>
          <StyledCloseIcon onClick={onClose}/>
          <Header>
            <RocketAuthorProfile src={tempUser.imageUrl} alt='profile' nickname={tempUser.nickname} />
            <RocketInputField />  
          </Header>
          <CardsContainer>
            {data.map((item) => (
              <RocketCard key={item.userId} data={item} />
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
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 2100;
`

const ModalTitle = styled.div`
  margin-left: 5px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-align: left;
  margin-bottom: 20px;
`

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
