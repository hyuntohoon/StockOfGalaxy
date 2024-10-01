'use client';

import React, { useEffect, useState } from 'react';
import NewsPageHeaderTemplate from '@/app/components/templates/planet/NewsPageHeaderTemplate';
import { getPlanetNews, getSpaceNews } from '@/app/utils/apis/news';
import { getDailyStockKeywordFrequency, getDailyKeywordFrequency } from '@/app/utils/apis/wordcloud';
import { useRecoilValue } from 'recoil';
import { dateState } from '@/app/store/date';
import { getStockInfo } from '@/app/utils/apis/stock/planet';
import { News, Stock } from '@/app/types/planet';
import PlanetDetailTemplate from '@/app/components/templates/planet/PlanetDetailTemplate'

const NewsPage: React.FC = (props: any) => {
  const {stock, date} = props.params;
  const todayDate = useRecoilValue(dateState);
  const [planetNews, setPlanetNews] = useState<News[]>();
  const [spaceNews, setSpaceNews] = useState<News[]>();
  const [planetWord, setPlanetWord] = useState<[]>();
  const [spaceWord, setSpaceWord] = useState<[]>();
  const [stockInfo, setStockInfo] = useState<Stock>();


  useEffect(() => {
    const fetchStockData = async() => {
      try{
        const res = await getStockInfo(stock);
        setStockInfo(res); // API에서 받은 stock info를 저장        
      }catch(error){
        console.error('Error fetching stock data:', error);
      }
    }

    const fetchPlanetData = async () => {
      try{
        const planetNews = await getPlanetNews(date, stockInfo.companyName);
        setPlanetNews(planetNews); // API에서 받은 planet news를 저장
        ///planer word 가져오기
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    const fetchSpaceData = async () => {
      try{
        const spaceNews = await getSpaceNews(date);
        setSpaceNews(spaceNews); // API에서 받은 space news를 저장
        ///space word 가져오기
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    }

    fetchStockData();
    fetchPlanetData();
    fetchSpaceData();
  }, [todayDate]);

  return (
    <>
      <PlanetDetailTemplate newsData={[]} wordData1={[]} wordData2={[[]]}/>
      {/* <NewsPageHeaderTemplate  /> */}
    </>
  );
};

export default NewsPage;
