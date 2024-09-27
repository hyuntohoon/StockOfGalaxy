import { useEffect, useState } from "react";

const approval_key = process.env.NEXT_PUBLIC_APPROVAL_KEY;

const convertToTimestamp = (KYMD: string, KHMS: string) => {
  const dateTimeString = `${KYMD.substring(0, 4)}-${KYMD.substring(
    4,
    6
  )}-${KYMD.substring(6, 8)}T${KHMS.substring(0, 2)}:${KHMS.substring(
    2,
    4
  )}:${KHMS.substring(4, 6)}`;

  return new Date(dateTimeString).getTime();
};

const parseWebSocketData = (data) => {
  const fields = data.split("|")[3].split("^");

  const fieldNames = [
    "RSYM",
    "SYMB",
    "ZDIV",
    "TYMD",
    "XYMD",
    "XHMS",
    "KYMD",
    "KHMS",
    "OPEN",
    "HIGH",
    "LOW",
    "LAST",
    "SIGN",
    "DIFF",
    "RATE",
    "PBID",
    "PASK",
    "VBID",
    "VASK",
    "EVOL",
    "TVOL",
    "TAMT",
    "BIVL",
    "ASVL",
    "STRN",
    "MTYP",
  ];

  const jsonResult: any = {};

  for (let i = 0; i < fieldNames.length; i++) {
    jsonResult[fieldNames[i]] = fields[i] || null;
  }

  const currentData = {
    RSYM: jsonResult.RSYM,
    SYMB: jsonResult.SYMB,
    KYMD: jsonResult.KYMD,
    KHMS: jsonResult.KHMS,
    OPEN: jsonResult.OPEN,
    HIGH: jsonResult.HIGH,
    LOW: jsonResult.LOW,
    LAST: jsonResult.LAST,
    SIGN: jsonResult.SIGN,
    DIFF: jsonResult.DIFF,
    RATE: jsonResult.RATE,
    TVOL: jsonResult.TVOL,
    TAMT: jsonResult.TAMT,
  };

  return currentData;
};

interface CoinState {
  currentPrice: number | null;
  changePrice: number | null;
  changeRate: number | null;
}

const useStockWebSocket = (tr_key: string, chart: any) => {
  useEffect(() => {
    const socket = new WebSocket(
      "ws://ops.koreainvestment.com:21000/tryitout/HDFSCNT0"
    );
    // const socket = new WebSocket("wss://api.upbit.com/websocket/v1");

    const data = `{"header": {"approval_key":"${approval_key}","custtype":"P","tr_type":"1","content-type":"utf-8"},"body": {"input": {"tr_id":"HDFSCNT0","tr_key":"${tr_key}"}}}`;

    socket.onopen = () => {
      console.log(`Connected to ${tr_key}`);
      socket.send(data);
    };

    socket.onmessage = async (event) => {
      const response = event.data.toString();

      console.log(response);

      if (response.startsWith('{"header":')) {
        return;
      }

      const jsonData = parseWebSocketData(response);

      const targetTimestamp = convertToTimestamp(jsonData.KYMD, jsonData.KHMS);

      chart?.updateData({
        timestamp: targetTimestamp,
        open: jsonData.OPEN,
        high: jsonData.HIGH,
        low: jsonData.LOW,
        close: jsonData.LAST,
        volume: jsonData.TVOL,
        turnover: jsonData.TAMT,
      });
    };

    socket.onclose = () => {
      console.log(`Disconnected from ${tr_key}`);
    };

    return () => {
      socket.close();
    };
  }, [tr_key, chart]);
};

export default useStockWebSocket;
