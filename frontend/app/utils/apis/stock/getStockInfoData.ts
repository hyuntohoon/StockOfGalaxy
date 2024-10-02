import axios from "axios";

export const getCompanyInfo = async (stock_code: string) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/stock/${stock_code}`,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFinancialMetricsInfo = async (stock_code: string) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/stock/financial-statements/${stock_code}`,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
