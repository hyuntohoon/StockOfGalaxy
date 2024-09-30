import axios from "axios";

interface StockDailyPriceProps {
  stockDate: string;
  lowPrice: number;
  highPrice: number;
  startPrice: number;
  endPrice: number;
  prdyVrss: string;
  prdyVrssSign: string;
  prdyCtrt: string;
}

export const getDailyStockData = async (
  stockCode: string
): Promise<StockDailyPriceProps | void> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/stock/${stockCode}/history`,
    });

    console.log("여기");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMinuteStockData = async (stock_code: string) => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, "0"); // HH
  const minutes = String(now.getMinutes()).padStart(2, "0"); // MM
  const seconds = String(now.getSeconds()).padStart(2, "0"); // SS

  const time = `${hours}${minutes}${seconds}`;

  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${stock_code}/minute-chart/${time}`,
    });

    const formattedData = res.data.minuteStockPrices.map((data) => {
      return {
        timestamp: `${data.stckBsopDate} ${data.stckCntgHour}`,
        open: data.stckOprc,
        high: data.stckHgpr,
        low: data.stckLwpr,
        close: data.stckPrpr,
        volume: data.cntgVol,
        turnover: data.acmlTrPbmn,
      };
    });

    return formattedData;
  } catch (error) {
    console.log(error);
  }
};

export const getPastStockData = async (stock_code: string, type: string) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/stock`,
    });

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentPrice = async (stock_code: string) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/stock/${stock_code}/current`,
    });

    // {
    //   "stockCode": "005930",
    //   "stckPrpr": "64200",  현재가
    //   "prdyVrss": "-500",  전일대비
    //   "prdyVrssSign": "5",  전일대비 부호
    //   "prdyCtrt": "-0.77"  전일대비율
    // }

    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
