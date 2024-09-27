'use client';

import React, { useEffect, useState } from 'react';
import NewsPageHeaderTemplate from '@/app/components/templates/planet/NewsPageHeaderTemplate';
import { todayNewsApi } from '@/app/utils/apis/news';
import { getDailyStockKeywordFrequency, getDailyKeywordFrequency } from '@/app/utils/apis/wordcloud';
import { useRecoilValue } from 'recoil';
import { dateState } from '@/app/store/date';

const NewsPage: React.FC = () => {
  const todayDate = useRecoilValue(dateState);
  const [newsData, setNewsData] = useState<any[]>([]); // API에서 받은 뉴스를 저장할 상태
  const [wordData1, setWordData1] = useState<any[]>([]); // res1 저장
  const [wordData2, setWordData2] = useState<any[]>([]); // res2 저장

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await todayNewsApi(todayDate);
        setNewsData(response); // API에서 받은 뉴스를 저장
        console.log(response);

        const res1 = await getDailyKeywordFrequency(todayDate); // 첫 번째 워드 클라우드 데이터
        setWordData1(res1); 
        console.log(res1);

        const res2 = await getDailyStockKeywordFrequency(todayDate); // 두 번째 워드 클라우드 데이터
        setWordData2(res2);
        console.log(res2);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchNewsData();
  }, [todayDate]);

  return (
    <>
      <NewsPageHeaderTemplate newsData={newsData} wordData1={wordData1} wordData2={wordData2} />
    </>
  );
};

export default NewsPage;
