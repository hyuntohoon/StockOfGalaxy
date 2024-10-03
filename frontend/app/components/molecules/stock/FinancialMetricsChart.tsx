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
  flex: 0 0 60%;
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
  const [financialMetricsInfo, setFinancialMetricsInfo] = useState([]);

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
      const labels = financialMetricsInfo.map((item) => item.stac_yymm);
      const totalCapital = financialMetricsInfo.map((item) =>
        parseFloat(item.total_equity)
      );
      const totalLiabilities = financialMetricsInfo.map((item) =>
        parseFloat(item.total_liabilites)
      );
      const debtRatio = financialMetricsInfo.map(
        (item) =>
          (parseFloat(item.total_liabilites) / parseFloat(item.total_equity)) *
          100
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

  const options = {
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
          display: false, // 세로선(격자선)을 숨김
        },
      },
      y: {
        type: "linear",
        position: "left",
        grid: {
          display: true, // 가로선만 표시
        },
        ticks: {
          callback: function (value) {
            return value / 10000 + "조";
          },
        },
      },
      y1: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false, // y1에 대해 그리드 숨기기
        },
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return (
    <Container>
      <Bar data={chartData} options={options} />
    </Container>
  );
};

export default FinancialMetricsChart;
