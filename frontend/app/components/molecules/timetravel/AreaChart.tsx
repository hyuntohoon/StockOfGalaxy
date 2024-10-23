import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import {
  ModalContent,
  ModalOverlay,
  ConfirmButton,
  CancelButton,
} from "./style";
import { useDate } from "@/app/store/date";
import { useRouter } from "next/navigation";
import { IBM_Plex_Sans_KR } from "next/font/google";

const ibm = IBM_Plex_Sans_KR({ weight: "500", subsets: ["latin"] });

// 서버 사이드 렌더링 없이 클라이언트에서 동적으로 불러와 화면 렌더링
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AreaChartProps {
  data: {
    date: string;
    newsCount: number;
    traffic: number;
    topStocks: string[];
  }[];
  detail: {
    date: string;
    newsCount: number;
    traffic: number;
    topStocks: string[];
  }[];
}

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 20px;
  padding: 40px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.4);
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;

  button {
    margin: 3px;
    padding: 6px 10px;
    background-color: #3a3f47;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 10px;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
      background-color: #505b68;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }
  }
`;

const Modal = ({
  onClose,
  onConfirm,
  date,
}: {
  onClose: () => void;
  onConfirm: () => void;
  date: string;
}) => {
  // 모달 바깥을 클릭했을 때 닫기
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        {/* 모달 텍스트 안내 */}
        <div className="modal-text-section">
          <h3>{date}로 이동하시겠습니까?</h3>
          <div className="modal-buttons">
            <ConfirmButton className={ibm.className} onClick={onConfirm}>
              확인
            </ConfirmButton>
            <CancelButton className={ibm.className} onClick={onClose}>
              취소
            </CancelButton>
          </div>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

const AreaChart: React.FC<AreaChartProps> = ({ data, detail }) => {
  const [series, setSeries] = useState([
    {
      name: "뉴스 수",
      data: [] as number[],
    },
    {
      name: "트래픽",
      data: [] as number[],
    },
  ]);

  const [categories, setCategories] = useState([] as string[]);
  const [modalData, setModalData] = useState<any>(null);
  const [selectedDays, setSelectedDays] = useState(7); // Default to 1 week
  const [yMin, setYMin] = useState<number | undefined>(undefined); // Y축 최소값
  const [yMax, setYMax] = useState<number | undefined>(undefined); // Y축 최대값
  const [filteredData, setFilteredData] = useState<
    { date: string; newsCount: number; traffic: number; topStocks: string[] }[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const { date, setDate } = useDate();
  const router = useRouter();

  const handleConfirm = (date: string) => {
    const newDate = date.split(" ")[0].replace(/-/g, "");
    setDate(newDate);
    router.push(`/main/${newDate}`);
  };

  const parseDate = (dateString: string) => {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}-${month}-${day}`; // 'YYYY-MM-DD' 형식으로 변환
  };

  // 필터된 데이터로 시리즈 업데이트
  useEffect(() => {
    const newFilteredData = data.slice(-selectedDays);
    setFilteredData(newFilteredData); // 필터된 데이터 저장
    setSeries([
      {
        name: "뉴스 수",
        data: newFilteredData.map((d) => d.newsCount),
      },
      {
        name: "거래량",
        data: newFilteredData.map((d) => d.traffic),
      },
    ]);
    setCategories(
      newFilteredData.map((d) => new Date(parseDate(d.date)).toISOString())
    );
    updateYAxisRange(newFilteredData); // Y축 범위 설정
  }, [data, selectedDays]);

  useEffect(() => {
    data.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
  }, [selectedDays]);

  const updateYAxisRange = (
    filteredData: { newsCount: number; traffic: number }[]
  ) => {
    const allValues = [
      ...filteredData.map((d) => d.newsCount),
      ...filteredData.map((d) => d.traffic),
    ];
    setYMin(Math.min(...allValues));
    setYMax(Math.max(...allValues));
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return `${year}/${month}/${day}`;
  };

  // 마우스 휠로 Y축 스크롤 효과를 구현
  const handleWheel = (event: React.WheelEvent) => {
    const delta = event.deltaY > 0 ? 0.1 : -0.1; // 스크롤 방향에 따라 값 조정
    if (yMin !== undefined && yMax !== undefined) {
      setYMin(yMin + yMin * delta);
      setYMax(yMax + yMax * delta);
    }
  };

  // 데이터 포인트 클릭 시 호출되는 핸들러
  const handleDataPointSelection = (
    event: any,
    chartContext: any,
    config: { seriesIndex: number; dataPointIndex: number; config: any }
  ) => {
    const { dataPointIndex } = config;
    const clickedData = filteredData[dataPointIndex];

    // 해당 날짜의 detail 데이터를 찾아서 모달에 전달
    const matchedDetail =
      detail && Array.isArray(detail) && clickedData.date
        ? detail.find((d) => d.date === clickedData.date)
        : undefined;

    if (matchedDetail) {
      setModalData(matchedDetail);
      setIsModalOpen(true);
    }
  };

  const options = {
    chart: {
      height: 500,
      type: "area" as const,
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: false,
          reset: false,
        },
      },
      events: {
        mounted: (chart: any) => {
          chart.el.addEventListener("wheel", handleWheel);
        },
        click: handleDataPointSelection, // 클릭 이벤트
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth" as const,
    },
    xaxis: {
      type: "datetime" as const,
      categories: categories,
      labels: {
        formatter: (value: string) => formatDate(value),
        style: {
          colors: "black",
        },
      },
    },
    yaxis: {
      show: true, // Y축 수치 표시
      min: yMin,
      max: yMax,
    },
    tooltip: {
      custom: function ({
        series,
        seriesIndex,
        dataPointIndex,
        w,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
        w: any;
      }) {
        const selectedData = filteredData[dataPointIndex];
        const formattedDate = formatDate(selectedData.date);

        return `
          <div style="
            background-color: #0e2439;
            padding: 16px;
            border-radius: 16px;
            color: white;
            text-align: center;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
            max-width: 250px;
            font-family: 'Arial', sans-serif;
          ">
            <div style="font-size: 16px; font-weight: bold; margin-bottom: 8px;">
              ${parseDate(selectedData.date)}
            </div>
            <div style="margin-bottom: 12px;">
              <strong style="font-size: 14px; color: #4CAF50;">${
                selectedData.topStocks.length == 3
                  ? "Top 3 주식:"
                  : "주식 폐장일"
              }</strong>
              <div>${
                selectedData.topStocks[0] ? selectedData.topStocks[0] : ""
              }</div>
              <div>${
                selectedData.topStocks[1] ? selectedData.topStocks[1] : ""
              }</div>
              <div>${
                selectedData.topStocks[2] ? selectedData.topStocks[2] : ""
              }</div>
            </div>
            <div style="border-top: 1px solid #fff; padding-top: 10px;">
              <strong>뉴스 수:</strong> ${series[0][
                dataPointIndex
              ].toLocaleString()}
              <br />
              <strong>거래량:</strong> ${series[1][
                dataPointIndex
              ].toLocaleString()}
            </div>
          </div>
        `;
      },
    },
  };

  return (
    <ChartContainer>
      <ButtonContainer>
        <button onClick={() => setSelectedDays(365)}>1년</button>
        <button onClick={() => setSelectedDays(30)}>한달</button>
        <button onClick={() => setSelectedDays(14)}>2주</button>
        <button onClick={() => setSelectedDays(7)}>1주</button>
      </ButtonContainer>

      <Chart
        options={options}
        series={series}
        type="area"
        height={350}
        width={650}
      />

      {/* 모달이 열려 있을 경우 모달 표시 */}
      {isModalOpen && modalData && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          date={modalData.date}
          onConfirm={() => handleConfirm(modalData.date)}
        />
      )}
    </ChartContainer>
  );
};

export default AreaChart;
