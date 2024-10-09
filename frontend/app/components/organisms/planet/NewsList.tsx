import React from 'react';
import { News } from '@/app/types/planet';
import ImgWithFallback from './ImgWithFallback';
import { NewsContent, NewsImage, NewsItem, NewsTitle, NewsMeta, NewsSummary, NewsListWrapper } from '@/app/styles/planet';
import styled from '@emotion/styled';

// 이미지에 스타일 적용
const StyledImage = styled.img`
  border-radius: 8px;
  width: 70px;
  height: 70px;
  object-fit: cover; /* 이미지 비율을 유지하면서 컨테이너 크기에 맞춰 조정 */
  margin-right: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NewsList: React.FC<{ news: News[]; onClick: (item: News) => void }> = ({ news, onClick }) => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <NewsListWrapper>
      {news && news.map((item) => (
        <NewsItem key={item.newsId} onClick={() => onClick(item)}>
          <StyledImage 
            src={item.thumbnailImg === "이미지 없음" ? "/images/default.jpg" : item.thumbnailImg} 
            alt={item.title} 
          />

          <NewsContent>
            <div>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsSummary>{item.content}</NewsSummary>
            </div>
            <NewsMeta>
              <span>{formatDate(item.publishedDate)}</span>
            </NewsMeta>
          </NewsContent>
        </NewsItem>
      ))}
    </NewsListWrapper>
  );
};

export default NewsList;
