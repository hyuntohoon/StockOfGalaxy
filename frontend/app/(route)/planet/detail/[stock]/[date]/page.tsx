'use client';

import React, { useEffect, useState } from 'react';
import { wordData } from '@/app/mocks/wordData';
import { getPlanetNewsWithContent, getSpaceNewsWithContent } from '@/app/utils/apis/news';
import { getStockInfo } from '@/app/utils/apis/stock/planet';
import { useRecoilValue } from 'recoil';
import { useDate } from '@/app/store/date';
import { News, Stock } from '@/app/types/planet';
import PlanetDetailTemplate from '@/app/components/templates/planet/PlanetDetailTemplate';
import TimeMachineButtonGroup from '@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup';
import RocketButtonGroup from '@/app/components/molecules/ButtonGroup/RocketButtonGroup';
import RocketModal from '@/app/components/organisms/Modal/RocketModal';
import { getTop7RocketsApi } from '@/app/utils/apis/rocket';
import { RocketData } from '@/app/types/rocket';


// 임시 뉴스 데이터
const dummyNewsData: News[] = [
  {
    newsId: 26,
    title: "삼성전자, 새로운 갤럭시 출시",
    publishDate: "2024-04-20T10:00:00",
    content: "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
    thumbnailImg: "/images/logo/samsung.png",
  },
  {
    newsId: 27,
    title: "삼성전자, 새로운 갤럭시 출시",
    publishDate: "2024-04-20T10:00:00",
    content: "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
    thumbnailImg: "/images/logo/samsung.png",
  },
];

const NewsPage: React.FC = (props: any) => {
  const {setDate} = useDate();
  const { stock, date } = props.params;
  setDate(props.params.date);
  const [planetNews, setPlanetNews] = useState<News[]>([]);
  const [spaceNews, setSpaceNews] = useState<News[]>([]);
  const [planetWord, setPlanetWord] = useState<{text: string, value: number}[]>(wordData);
  const [spaceWord, setSpaceWord] = useState<{text: string, value: number}[]>(wordData);
  const [stockInfo, setStockInfo] = useState<Stock>();
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);
  const [rocketData, setRocketData] = useState<RocketData[]>([]);

  const fetchRocketData = async () => {
    try {
      const response = await getTop7RocketsApi(stock);
      // const response = rocketTop7ListData.rocketList; // toto: api 연동해서 실제 데이터로 변경
      setRocketData(response.rocketList);
    } catch (error) {
      console.error('로켓 데이터를 불러오는 중 에러가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    fetchRocketData();
  }, [stock]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await getStockInfo(stock);
        setStockInfo(res); // API에서 받은 stock info를 저장        
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    const fetchPlanetData = async () => {
      try {
        const res = await getPlanetNewsWithContent(date, stockInfo?.companyName || '');
        // planetNews가 비어있으면 dummy 데이터로 설정
        setPlanetNews(res.length > 0 ? res : dummyNewsData);
      } catch (error) {
        console.error('Error fetching news data:', error);
        setPlanetNews(dummyNewsData); // 에러 발생 시 dummy 데이터로 설정
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
  }, []);

  return (
    <>
      <PlanetDetailTemplate 
        planetNews={planetNews} 
        spaceNews={spaceNews} 
        planetWord={planetWord} 
        spaceWord={spaceWord} 
      />
      <TimeMachineButtonGroup />
      <RocketButtonGroup onRocketClick={() => setIsRocketModalOpen(true)} />
      {isRocketModalOpen && <RocketModal onClose={() => setIsRocketModalOpen(false)} fetchRocketData={fetchRocketData} />}
    </>
  );
};

export default NewsPage;
