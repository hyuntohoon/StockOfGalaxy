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
    // financialList를 yyyymm으로 정렬
    const sortedData = res.data.financialList.sort(
      (a, b) => a.stac_yymm - b.stac_yymm
    );

    // 연도별로 중복 제거
    const uniqueByYear = sortedData.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.stac_yymm.toString().slice(0, 4) ===
            item.stac_yymm.toString().slice(0, 4)
        )
    );

    return uniqueByYear;
  } catch (error) {
    console.log(error);
  }
};
