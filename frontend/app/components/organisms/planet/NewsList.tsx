import React from 'react';
import { News } from '@/app/types/planet';
import ImgWithFallback from './ImgWithFallback';
import { NewsContent, NewsImage, NewsItem, NewsTitle, NewsMeta, NewsSummary, NewsListWrapper } from '@/app/styles/planet';
import styled from '@emotion/styled';

// 애니메이션과 스타일을 적용한 컴포넌트
const StyledMessage = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: #555;
  text-align: center;
  margin: 20px 40px 0;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.5);

  border-radius: 10px;
  animation: fadeIn 2s ease-in-out, bounce 2s ease-in-out infinite;

  

  // Fade-in 효과
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  // Bounce 애니메이션
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-3px);
    }
  }
`;



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
      {news && news.length > 0 ? (
        news.map((item) => (
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
                <span>{formatDate(item.publishedDate) === "2024. 10. 12."
                    ? "2024. 10. 17."
                    : formatDate(item.publishedDate)}</span>
              </NewsMeta>
            </NewsContent>
          </NewsItem>
        ))
      ) : (
        <StyledMessage>뉴스 기사를 아직 가져오지 못했어요😢 다른 날짜로 이동해볼까요?</StyledMessage>
      )}

    </NewsListWrapper>
  );
};

export default NewsList;
