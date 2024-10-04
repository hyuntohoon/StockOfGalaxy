import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { News, NewsDetail } from '@/app/types/planet';
import { IoClose } from 'react-icons/io5';
import { getNewsDetail } from '@/app/utils/apis/news';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 60%;
  height: 90%;
  position: relative;
  overflow-y: auto;
  color: black;
    ::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const NewsModal: React.FC<{ news: News; onClose: () => void }> = ({ news, onClose }) => {
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const newsData = await getNewsDetail(news.newsId); // newsId를 사용하여 뉴스 세부 정보 가져오기
        setNewsDetail(newsData); // 뉴스 세부 정보 상태 업데이트
      } catch (err) {
        console.error('Error fetching news detail:', err);
      }
    };

    if (news.newsId) {
      fetchNewsDetail();
    }
  }, [news.newsId]); // newsId가 변경될 때마다 세부 정보 가져오기

  if (!newsDetail) return <p>Loading...</p>; // 세부 정보가 로딩 중일 때 표시할 내용

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}><IoClose /></CloseButton>
        <h2>{newsDetail.title}</h2>
        <p>발행일: {new Date(newsDetail.publishedDate).toLocaleDateString('ko-KR')}</p>
        <img src={newsDetail.thumbnailImg} alt={newsDetail.title} />
        <p>{newsDetail.content}</p>
        <p>카테고리: {newsDetail.category}</p>
        <p>뉴스 링크: <a href={newsDetail.newsLink} target="_blank" rel="noopener noreferrer">{newsDetail.newsLink}</a></p>
        <p>감정 지수: {newsDetail.sentimentIndex}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewsModal;
