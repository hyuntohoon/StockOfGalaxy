"use client";

import React, { useEffect, useState } from "react";
import { wordData } from "@/app/mocks/wordData";
import {
  getPlanetNewsWithContent,
  getSpaceNewsWithContent,
  getSpaceKeywords
} from "@/app/utils/apis/news";
import { getStockInfo, getStockName } from "@/app/utils/apis/stock/planet";
import { useRecoilValue } from "recoil";
import { useDate } from "@/app/store/date";
import { News, Stock } from "@/app/types/planet";
import PlanetDetailTemplate from "@/app/components/templates/planet/PlanetDetailTemplate";
import TimeMachineButtonGroup from "@/app/components/molecules/ButtonGroup/TimeMachineButtonGroup";
import RocketButtonGroup from "@/app/components/molecules/ButtonGroup/RocketButtonGroup";
import RocketModal from "@/app/components/organisms/Modal/RocketModal";
import { getTop7RocketsApi } from "@/app/utils/apis/rocket";
import { RocketData } from "@/app/types/rocket";
import { ErrorBoundary } from "react-error-boundary";
import DetailPageDateCard from "@/app/components/molecules/Card/DetailPageDateCard";
import CustomCalendar from "@/app/components/organisms/planet/CustomCalendar"

// 임시 뉴스 데이터
const dummyNewsData: News[] = [
  {
    newsId: 26,
    title: "삼성전자, 새로운 갤럭시 출시",
    publishDate: "2024-04-20T10:00:00",
    content:
      "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
    thumbnailImg: "/images/logo/samsung.png",
  },
  {
    newsId: 27,
    title: "삼성전자, 새로운 갤럭시 출시",
    publishDate: "2024-04-20T10:00:00",
    content:
      "삼성전자가 2일 장초반 주당 6만원선이 붕괴됐다. 반도체 고점론에 대한 우려가 가시지 않은 가운데 중동 리스크로 인해 투자심리가 위축된 영향으로 풀이된다. 삼성전자는 이날...",
    thumbnailImg: "/images/logo/samsung.png",
  },
];

const formatDate = (dateString:string) => {
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1; // 월은 0부터 시작하므로 -1 필요
  const day = parseInt(dateString.substring(6, 8), 10);
  return new Date(year, month, day);
}

const NewsPage: React.FC = (props: any) => {
  const { setDate } = useDate();
  const { stock, date } = props.params;
  useEffect(() => {
    setDate(props.params.date);
  }, [date, setDate]);
  const [planetNews, setPlanetNews] = useState<News[]>([]);
  const [spaceNews, setSpaceNews] = useState<News[]>([]);
  const [planetWord, setPlanetWord] =
    useState<{ text: string; value: number }[]>(wordData);
  const [spaceWord, setSpaceWord] =
    useState<{ text: string; value: number }[]>(wordData);
  const [stockInfo, setStockInfo] = useState<Stock>();
  const [isRocketModalOpen, setIsRocketModalOpen] = useState(false);
  const [rocketData, setRocketData] = useState<RocketData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(formatDate(date)); // 선택된 날짜 상태
  const [name, setName] = useState<string>("");


  const fetchRocketData = async () => {
    try {
      const response = await getTop7RocketsApi(stock);
      // const response = rocketTop7ListData.rocketList; // toto: api 연동해서 실제 데이터로 변경
      setRocketData(response.rocketList);
    } catch (error) {
      console.error("로켓 데이터를 불러오는 중 에러가 발생했습니다.", error);
    }
  };

  const DateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  }
  

  useEffect(() => {
    fetchRocketData();
  }, [stock]);

  useEffect(() => {
    const fetchPlanetData = async (stockName: string) => {
      try {
        console.log("요청", stockName, date);
        const res = await getPlanetNewsWithContent(DateToString(selectedDate), stockName);
        // planetNews가 비어있으면 dummy 데이터로 설정
        setPlanetNews(res.length > 0 ? res : dummyNewsData);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setPlanetNews(dummyNewsData); // 에러 발생 시 dummy 데이터로 설정
      }
    };
    fetchPlanetData(name);
  }, [selectedDate])

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const res = await getStockInfo(stock);
        setStockInfo(res); // API에서 받은 stock info를 저장
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const getName = async () => {
      try {
        const name = await getStockName(stock);
        setName(name); // API에서 받은 stock name를 저장
        return name;
      } catch (error) {
        console.error("Error fetching stock name:", error);
      }
    };

    const fetchPlanetData = async (stockName: string) => {
      try {
        console.log("요청", stockName, date);
        const res = await getPlanetNewsWithContent(DateToString(selectedDate), stockName);
        // planetNews가 비어있으면 dummy 데이터로 설정
        setPlanetNews(res.length > 0 ? res : dummyNewsData);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setPlanetNews(dummyNewsData); // 에러 발생 시 dummy 데이터로 설정
      }
    };

    const fetchSpaceData = async () => {
      try {
        const res = await getSpaceNewsWithContent(date);
        // spaceNews가 비어있으면 dummy 데이터로 설정
        setSpaceNews(res.length > 0 ? res : dummyNewsData);
      } catch (error) {
        console.error("Error fetching news data:", error);
        setSpaceNews(dummyNewsData); // 에러 발생 시 dummy 데이터로 설정
      }
    };
    
    const fetchSpaceKeywords = async() => {
      try {
        const res = await getSpaceKeywords(date);
        if(res) {
          setSpaceWord(res);
        }
        
      }catch (error) {
        console.error("Error fetching news data:", error);
        setSpaceNews(dummyNewsData); // 에러 발생 시 dummy 데이터로 설정
      }
    }

    // 비동기 호출을 감싸는 함수
    const fetchData = async () => {
      await fetchStockData();
      const response = await getName(); // `await` 추가
      await fetchSpaceKeywords();
      await fetchPlanetData(name);
      await fetchSpaceData();
    };

    fetchData(); // 데이터 가져오기 호출
  }, []);

  const logError = (error: Error, info: { componentStack: string }) => {
    console.log("Error:", error);
    console.log("Info:", info);
  };

  const FallbackComponent = ({ error, resetErrorBoundary }: any) => {
    return (
      <div>
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  };



  return (
    <ErrorBoundary FallbackComponent={FallbackComponent} onError={logError}>
      <PlanetDetailTemplate
        planetNews={planetNews}
        spaceNews={spaceNews}
        planetWord={planetWord}
        spaceWord={spaceWord}
        calendar={
        <CustomCalendar
          selectedDate={selectedDate}
          setDate={setSelectedDate}
          today={formatDate(date)}
        />}
      />
      <TimeMachineButtonGroup />
      <RocketButtonGroup onRocketClick={() => setIsRocketModalOpen(true)} />
      {isRocketModalOpen && (
        <RocketModal
          onClose={() => setIsRocketModalOpen(false)}
          fetchRocketData={fetchRocketData}
        />
      )}
    <DetailPageDateCard date={date}/>
    </ErrorBoundary>
  );
};

export default NewsPage;
