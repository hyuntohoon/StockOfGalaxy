'use client';

import React, { useEffect, useState } from 'react';
import { wordData } from '@/app/mocks/wordData';
import { getPlanetNews, getSpaceNews, getPlanetNewsWithContent, getSpaceNewsWithContent } from '@/app/utils/apis/news';
import { getStockInfo } from '@/app/utils/apis/stock/planet';
import { useRecoilValue } from 'recoil';
import { dateState } from '@/app/store/date';
import TimeMachineButtonGroup from '@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup';
import RocketButtonGroup from '@/app/components/molecules/ButtonGroup/RocketButtonGroup';
import RocketModal from '@/app/components/organisms/Modal/RocketModal';


const NewsPage: React.FC = (props: any) => {
  const {stock, date} = props.params;
  const todayDate = useRecoilValue(dateState);
  const [newsData, setNewsData] = useState<any[]>([]); // API에서 받은 뉴스를 저장할 상태
  const [wordData1, setWordData1] = useState<any[]>([]); // res1 저장
  const [wordData2, setWordData2] = useState<any[]>([]); // res2 저장
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);


  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await todayNewsApi(date);
        setNewsData(response); // API에서 받은 뉴스를 저장
        console.log(response);

    const fetchPlanetData = async () => {
      try {
        const res = await getPlanetNewsWithContent(date, stockInfo?.companyName || '');
        // planetNews가 비어있으면 dummy 데이터로 설정
        setPlanetNews(res.length > 0 ? res : dummyNewsData);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    const fetchSpaceData = async () => {
      try {
        const res = await getSpaceNewsWithContent(date);
        // spaceNews가 비어있으면 dummy 데이터로 설정
        setSpaceNews(res.length > 0 ? res : dummyNewsData);
      } catch (error) {
        console.error('Error fetching news data:', error);
        setSpaceNews(dummyNewsData); // 에러 발생 시 dummy 데이터로 설정
      }
    };

    fetchStockData();
    fetchPlanetData();
    fetchSpaceData();
  }, [todayDate, stock, date, stockInfo]);

  return (
    <>
      <NewsPageHeaderTemplate newsData={newsData} wordData1={wordData1} wordData2={wordData2} />
    </>
  );
};

export default NewsPage;
