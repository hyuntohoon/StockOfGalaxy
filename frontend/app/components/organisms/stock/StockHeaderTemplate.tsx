"use client";

import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import StockHeaderPrice from "../../molecules/stock/StockHeaderPrice";
import StockHeaderInfo from "../../molecules/stock/StockHeaderInfo";

const ParentContainer = styled.div`
  width: 50vw;
  height: 50vh;
  overflow-y: auto;
  background-color: #111;
  color: white;
  width: 1000px;
  height: 60px;
  background-color: #d9d9d9;
  border-radius: 20px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
`;

const Container = styled.div`
  color: black;
  width: 1000px;
  height: 60px;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

const StockHeaderTemplate = () => {
  const market = "KRW-BTC";

  useEffect(() => {
    const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    socket.onopen = () => {
      console.log(`Connected to ${market}`);
      socket.send(
        JSON.stringify([
          { ticket: "UNIQUE_TICKET" },
          {
            type: "ticker",
            codes: [market],
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

      if (jsonData && jsonData.trade_price) {
        setPrice(jsonData.trade_price);
      }

      if (jsonData && jsonData.change_price && jsonData.change) {
        setChangePrice(
          jsonData.change === "FALL"
            ? -jsonData.change_price
            : jsonData.change_price
        );
      }

      if (jsonData && jsonData.change_rate && jsonData.change) {
        setChangeRate(jsonData.change_rate * 100);
      }
    };

    socket.onclose = () => {
      console.log(`Disconnected from ${market}`);
    };
  }, []);

  const [price, setPrice] = useState(0);
  const [changePrice, setChangePrice] = useState(0);
  const [changeRate, setChangeRate] = useState(0);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <ParentContainer>
        <Container>
          <StockHeaderPrice
            price={price}
            changePrice={changePrice}
            changeRate={changeRate}
          />
          <StockHeaderInfo />
        </Container>
      </ParentContainer>
    </>
  );
};

export default StockHeaderTemplate;
