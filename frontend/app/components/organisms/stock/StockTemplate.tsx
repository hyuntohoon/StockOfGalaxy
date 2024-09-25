"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import StockPrice from "../../molecules/stock/StockPrice";
import StockInfo from "../../molecules/stock/StockInfo";

const ParentContainer = styled.div`
  width: 50vw;
  height: 50vh;
  overflow-y: auto;
  background-color: #111;
  color: white;
  width: 300px;
  height: 80%;
  background-color: #d9d9d9;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const Container = styled.div`
  color: black;
  padding: 20px;
  margin: 8px 15px;
  background-color: #ffffff;
  width: 270px;
  height: 30px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

interface CoinData {
  market: string;
  korean_name: string;
  english_name: string;
}

interface CoinState {
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

const StockTemplate = () => {
  const [coinData, setCoinData] = useState<CoinData[]>([
    { market: "KRW-BTC", korean_name: "비트코인", english_name: "Bitcoin" },
    { market: "KRW-ETH", korean_name: "이더리움", english_name: "Ethereum" },
    { market: "KRW-NEO", korean_name: "네오", english_name: "NEO" },
    { market: "KRW-MTL", korean_name: "메탈", english_name: "Metal" },
    { market: "KRW-XRP", korean_name: "리플", english_name: "Ripple" },
    { market: "KRW-BTC", korean_name: "비트코인", english_name: "Bitcoin1" },
    { market: "KRW-ETH", korean_name: "이더리움", english_name: "Ethereum1" },
    { market: "KRW-NEO", korean_name: "네오", english_name: "NEO1" },
    { market: "KRW-MTL", korean_name: "메탈", english_name: "Metal1" },
    { market: "KRW-XRP", korean_name: "리플", english_name: "Ripple1" },
  ]);

  const [coinStates, setCoinStates] = useState<Record<string, CoinState>>(
    coinData.reduce((acc, coin) => {
      acc[coin.market] = {
        currentPrice: null,
        changePrice: null,
        changeRate: null,
      };
      return acc;
    }, {} as Record<string, CoinState>)
  );

  useEffect(() => {
    const sockets: Record<string, WebSocket> = {};

    coinData.forEach((coin) => {
      const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

      socket.onopen = () => {
        console.log(`Connected to ${coin.market}`);
        socket.send(
          JSON.stringify([
            { ticket: "UNIQUE_TICKET" },
            {
              type: "ticker",
              codes: [coin.market],
              isOnlySnapshot: true,
              isOnlyRealtime: true,
            },
            { format: "DEFAULT" },
          ])
        );
      };

      socket.onmessage = async (event) => {
        const data =
          event.data instanceof Blob ? await event.data.text() : event.data;
        const jsonData = JSON.parse(data);

        const updatedStates = { ...coinStates };

        if (jsonData && jsonData.trade_price) {
          updatedStates[coin.market].currentPrice = jsonData.trade_price;
        }

        if (jsonData && jsonData.change_price && jsonData.change) {
          updatedStates[coin.market].changePrice =
            jsonData.change === "FALL"
              ? -jsonData.change_price
              : jsonData.change_price;
        }

        if (jsonData && jsonData.change_rate && jsonData.change) {
          updatedStates[coin.market].changeRate =
            jsonData.change === "FALL"
              ? -jsonData.change_rate * 100
              : jsonData.change_rate * 100;
        }

        setCoinStates(updatedStates);
      };

      socket.onclose = () => {
        console.log(`Disconnected from ${coin.market}`);
      };

      sockets[coin.market] = socket;
    });

    return () => {
      Object.values(sockets).forEach((socket) => {
        socket.close();
      });
    };
  }, [coinData]);

  return (
    <ParentContainer>
      <Header>
        <span>실시간 차트</span>
        <span>|</span>
        <span>뉴스</span>
      </Header>
      {coinData.map((coin, index) => (
        <Container key={coin.english_name}>
          <StockInfo index={index} koreanName={coin.korean_name}></StockInfo>
          <StockPrice market={coin.market}></StockPrice>
        </Container>
      ))}
    </ParentContainer>
  );
};

export default StockTemplate;
