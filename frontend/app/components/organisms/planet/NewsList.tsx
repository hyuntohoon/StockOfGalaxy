// NewsList.tsx
import React, { useState } from 'react';
import { News } from '@/app/types/News';
import { getNewsDetail } from '@/app/utils/apis/news'; // 뉴스 상세 정보 API import
import { NewsContent, NewsImage, NewsItem, NewsTitle, NewsMeta, NewsSummary, NewsListWrapper } from '@/app/styles/planet';

const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [newsDetail, setNewsDetail] = useState<any>(null); // 뉴스 상세 정보 상태

  const handleNewsClick = async (item: News) => {
    try {
      const newsDetailData = await getNewsDetail(item.id); // API 요청으로 뉴스 상세 정보 가져오기
      setNewsDetail(newsDetailData); // 뉴스 상세 정보 상태 업데이트
      setSelectedNews(item);
      
    } catch (error) {
      console.error('뉴스 상세 조회 실패:', error);
    }
  };

  return (
    <NewsListWrapper>
      {news.map((item) => (
        <NewsItem key={item.id} onClick={() => handleNewsClick(item)}>
          <NewsImage src={item.img} alt={item.title} />
          <NewsContent>
            <div>
              <NewsTitle>{item.title}</NewsTitle>
              {item.content && <NewsSummary>{item.content}</NewsSummary>}
            </div>
            <NewsMeta>
              <span>{item.writeDate}</span>
              <span>{item.newspaper}</span>
            </NewsMeta>
          </NewsContent>
        </NewsItem>
      ))}
      
    </NewsListWrapper>
  );
};

export default NewsList;
