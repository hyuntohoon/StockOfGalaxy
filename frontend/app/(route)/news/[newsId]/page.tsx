// pages/news/[newsId].tsx
'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getNewsDetail } from '@/app/utils/apis/news';
import { NewsDetail } from '@/app/types/planet';
import Image from 'next/image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { IoArrowBack } from 'react-icons/io5';

const NewsDetailPage: React.FC = (props: any) => {
  const router = useRouter();
  const { newsId } = props.params;
  const [newsDetail, setNewsDetail] = useState<NewsDetail | null>(null);

  useEffect(() => {
    if (newsId) {
      const fetchNewsDetail = async () => {
        try {
          const newsData = await getNewsDetail(Number(newsId));
          setNewsDetail(newsData);
        } catch (error) {
          console.error('Error fetching news detail:', error);
        }
      };
      fetchNewsDetail();
    }
  }, [newsId]);

  const handleBack = () => {
    router.back();
  };

  if (!newsDetail) return <p>Loading...</p>;

  return (
    <NewsDetailWrapper>
      <ContentBox>
        <BackButton onClick={handleBack}>
          <IoArrowBack size={24} />
        </BackButton>
        <Title>{newsDetail.title}</Title>
        <NewsMeta>
          <p>발행일: {new Date(newsDetail.publishedDate).toLocaleDateString()}</p>
        </NewsMeta>
        <ImageContainer>
          <Image
            src={newsDetail.thumbnailImg}
            alt={newsDetail.title}
            layout="responsive"
            width={800}
            height={500}
          />
        </ImageContainer>
        <Content>{newsDetail.content}</Content>
        <NewsLink href={newsDetail.newsLink} target="_blank">
          원본 보기
        </NewsLink>
      </ContentBox>
    </NewsDetailWrapper>
  );
};

export default NewsDetailPage;

// Styled Components
const NewsDetailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: 95vh;
  padding: 20px;
  overflow-y: auto; /* 상하 스크롤 활성화 */
`;

const ContentBox = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 70px 50px;
  max-width: 800px;
  width: 100%;
  position: relative;
  height: 100%;
  overflow-y: auto; /* 상하 스크롤 활성화 */
  ::-webkit-scrollbar {
  display: none;
}
`;

const BackButton = styled.button`
  position: absolute;
  top: 30px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  &:hover {
    color: #0070f3;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const NewsMeta = styled.div`
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
`;

const ImageContainer = styled.div`
  overflow: hidden;
  margin-bottom: 20px;
`;

const Content = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #444;
  margin-bottom: 30px;
`;

const NewsLink = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
    background-color: #005bb5;
  }
  transition: background-color 0.3s ease;
`;
