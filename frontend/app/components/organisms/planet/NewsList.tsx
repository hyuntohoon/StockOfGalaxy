import React from 'react';
import { useRouter } from 'next/navigation'; // Next.js의 useRouter 사용
import { News } from '@/app/types/planet';
import { NewsContent, NewsImage, NewsItem, NewsTitle, NewsMeta, NewsSummary, NewsListWrapper } from '@/app/styles/planet';

const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleNewsClick = (newsId: number) => {
    // 현재 가로 스크롤 값을 저장
    const scrollPositionX = window.scrollX;
    sessionStorage.setItem('scrollPositionX', scrollPositionX.toString());

    // newsId로 상세 페이지로 이동
    router.push(`/news/${newsId}`);
  };

  return (
    <NewsListWrapper>
      {news && news.map((item) => (
        <NewsItem key={item.newsId} onClick={() => handleNewsClick(item.newsId)}>
          <NewsImage src={item.thumbnailImg} alt={item.title} />
          <NewsContent>
            <div>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsSummary>{item.content}</NewsSummary>
            </div>
            <NewsMeta>
              <span>{formatDate(item.publishDate)}</span>
            </NewsMeta>
          </NewsContent>
        </NewsItem>
      ))}
    </NewsListWrapper>
  );
};

export default NewsList;
