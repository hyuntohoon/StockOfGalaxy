// NewsList.tsx
import React, { useState } from 'react';
import { News } from '@/app/types/News';
import Modal from '@/app/components/organisms/planet/Modal'; // 모달 컴포넌트 import
import { NewsContent, NewsImage, NewsItem, NewsTitle, NewsMeta, NewsSummary, NewsListWrapper } from '@/app/styles/planet';
const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);

  const handleNewsClick = (item: News) => {
    setSelectedNews(item);
    setModalOpen(true);
  };

  return (
    <NewsListWrapper>
      {news.map((item) => (
        <NewsItem key={item.id} onClick={() => handleNewsClick(item)}>
          <NewsImage src={item.img} alt={item.title} />
          <NewsContent>
            <div>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsSummary>{item.content}</NewsSummary>
            </div>
            <NewsMeta>
              <span>{item.write_date}</span>
              <span>{item.신문사}</span>
            </NewsMeta>
          </NewsContent>
        </NewsItem>
      ))}
      {selectedNews && (
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          newsDetail={{news: selectedNews, keywords: ['LG에너지솔루션', '엔켐']}}
        />
      )}
    </NewsListWrapper>
  );
};

export default NewsList;
