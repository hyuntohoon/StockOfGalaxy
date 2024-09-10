"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";

const ParentContainer = styled.div`
  width: 50vw;
  height: 50vh;
  overflow-y: auto;
  background-color: #111;
  color: white;
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
  color: white;
  padding: 20px;
  margin: 10px 0px;
  background-color: #333;
  width: 300px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .left-container {
    display: flex;
    align-items: center;
    margin-right: 20px;
  }

  .right-container {
    display: flex;
    flex-direction: column;
    text-align: right;
  }

  .real-time-price {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .real-time-change {
    color: ${(props) => (props.changeRate > 0 ? "red" : "blue")};
  }
`;

const Logo = styled.img`
  width: 30px;
  height: auto;
  margin-right: 10px;
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

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <ParentContainer>
      {coinData.map((coin) => (
        <Container key={coin.market}>
          <div className="left-container">
            <Logo
              src="https://ssl.pstatic.net/imgstock/fn/real/logo/stock/Stock035420.svg"
              alt={coin.english_name}
            />
            <span>{coin.korean_name}</span>
          </div>

          <div className="right-container">
            <div className="real-time-price">
              {coinStates[coin.market].currentPrice !== null
                ? `${formatPrice(coinStates[coin.market].currentPrice)}원`
                : "가격을 불러오는 중..."}
            </div>
            <div className="real-time-change">
              {coinStates[coin.market].changePrice !== null
                ? `${formatPrice(coinStates[coin.market].changePrice)}원`
                : ""}
              {coinStates[coin.market].changeRate !== null
                ? ` (${coinStates[coin.market].changeRate.toFixed(1)}%)`
                : ""}
            </div>
          </div>
        </Container>
      ))}
    </ParentContainer>
  );
};

export default StockTemplate;
