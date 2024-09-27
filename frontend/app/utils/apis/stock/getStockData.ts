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
