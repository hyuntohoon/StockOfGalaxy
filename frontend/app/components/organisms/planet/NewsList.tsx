import React, {useState} from 'react';
import { News } from '@/app/types/planet';
import ImgWithFallback from './ImgWithFallback';
import { NewsContent, NewsImage, NewsItem, NewsTitle, NewsMeta, NewsSummary, NewsListWrapper } from '@/app/styles/planet';
import Image from 'next/image';

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
          <img src={item.thumbnailImg} alt={item.title} width={70} height={70} />
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
