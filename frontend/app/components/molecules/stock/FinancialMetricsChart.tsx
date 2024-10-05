"use client";

import { useParams } from "next/navigation";
import { getFinancialMetricsInfo } from "@/app/utils/apis/stock/getStockInfoData";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import styled from "@emotion/styled";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Container = styled.div`
  display: flex;
  flex: 0 0 50%;
  width: 620px;
  height: auto;
  padding: 10px;
  background-color: white;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const FinancialMetricsChart = () => {
  const { stock } = useParams();
  const stock_code = Array.isArray(stock) ? stock[0] : stock ?? "005930";
  const [financialMetricsInfo, setFinancialMetricsInfo] = useState<any[]>([
    {
      stock_code: "005930",
      stac_yymm: "201703",
      current_assets: 1292842,
      current_liabilites: 568431,
      total_liabilites: 743994,
      total_equity: 1898180,
    },
  ]);

  const formatDateString = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    return `${year}.${month}`;
  };

  useEffect(() => {
    const getData = async () => {
      const dataList = await getFinancialMetricsInfo(stock_code);
      setFinancialMetricsInfo(dataList);
    };
    getData();
  }, []);

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (financialMetricsInfo) {
      console.log(financialMetricsInfo);

      const labels = financialMetricsInfo.map((item) =>
        formatDateString(item.stac_yymm)
      );
      const totalCapital = financialMetricsInfo.map(
        (item) => item.total_equity
      );
      const totalLiabilities = financialMetricsInfo.map(
        (item) => item.total_liabilites
      );
      const debtRatio = financialMetricsInfo.map(
        (item) => (item.total_liabilites / item.total_equity) * 100
      ); // 부채비율 계산

      const data = {
        labels,
        datasets: [
          {
            label: "총 자본",
            data: totalCapital,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            type: "bar", // 막대 그래프
            yAxisID: "y",
          },
          {
            label: "총 부채",
            data: totalLiabilities,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            type: "bar", // 막대 그래프
            yAxisID: "y",
          },
          {
            label: "부채비율",
            data: debtRatio,
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            type: "line", // 선 그래프
            fill: false,
            yAxisID: "y1",
          },
        ],
      };

      setChartData(data);
    }
  }, [financialMetricsInfo]);

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "center",
      },
      title: {
        display: true,
        text: "부채비율",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear",
        position: "left",
        grid: {
          display: true,
        },
        ticks: {
          callback: function (value: any) {
            return value / 10000 + "조";
          },
        },
      },
      y1: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value: any) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <Container>
      {chartData.labels.length > 0 && chartData.datasets.length > 0 && (
        <Bar data={chartData} options={options} />
      )}
    </Container>
  );
};

export default FinancialMetricsChart;
