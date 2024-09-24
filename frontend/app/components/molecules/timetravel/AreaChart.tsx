import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { wordData } from '@/app/mocks/wordData';
import WordCloudComponent from '../common/WordCloudComponent';

// Keyframes for overlay fade-in
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Keyframes for modal content slide-up
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 서버 사이드 렌더링 없이 클라이언트에서 동적으로 불러와 화면 렌더링
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface AreaChartProps {
  data: { date: string; newsCount: number; traffic: number; topStocks: string[] }[];
  detail: { date: string; newsCount: number; traffic: number; topStocks: string[]; wordCloudData: {text: string; value: number}[] }[];
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
  background: rgba(0, 0, 0, 0.5);
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

// Modal Overlay 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: ${fadeIn} 0.4s ease forwards;
`;

// Modal Content 스타일
const ModalContent = styled.div`
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  width: 600px;
  max-width: 95%;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.4s ease forwards;
  position: relative;
  color: #333;
  display: flex; /* Flex 레이아웃 적용 */
  justify-content: space-between;
  gap: 20px;

  /* 닫기 버튼 */
  button.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    color: #333;
    transition: color 0.3s ease;

    &:hover {
      color: #555;
    }
  }

  /* 왼쪽 섹션 (텍스트 정보) */
  .modal-text-section {
    flex: 1; /* 텍스트 섹션이 좌측에 고정 */
    p, h4 {
      margin: 10px 0;
      font-size: 1rem;
      line-height: 1.5;
    }

    ul {
      list-style-type: none;
      padding-left: 0;
      margin-bottom: 20px;

      li {
        font-size: 0.95rem;
        margin-bottom: 5px;
        color: #444;
      }
    }
  }

  /* 오른쪽 섹션 (워드 클라우드) */
  .word-cloud-container {
    flex: 1; /* 워드 클라우드가 우측에 배치됨 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

// Modal Component
const Modal = ({ onClose, modalData }: { onClose: () => void, modalData: any }) => {
  // 모달 바깥을 클릭했을 때 닫기
  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <button className="close-button" onClick={onClose}>×</button>
        
        {/* 왼쪽 텍스트 정보 */}
        <div className="modal-text-section">
          <h3>{modalData.date}</h3>
          <p>뉴스 수: {modalData.newsCount}</p>
          <p>트래픽: {modalData.traffic}</p>
          <h4>Top 3 주식</h4>
          <ul>
            {modalData.topStocks.map((stock: string, index: number) => (
              <li key={index}>{stock}</li>
            ))}
          </ul>
          
        </div>

        {/* 오른쪽 워드 클라우드 */}
        <div className="word-cloud-container">
          <WordCloudComponent data={modalData.wordCloudData} width={300} height={300} />
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};


const AreaChart: React.FC<AreaChartProps> = ({ data, detail }) => {
  const [series, setSeries] = useState([
    {
      name: '뉴스 수',
      data: [] as number[],
    },
    {
      name: '트래픽',
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

  // 필터된 데이터로 시리즈 업데이트
  useEffect(() => {
    const newFilteredData = data.slice(-selectedDays);
    setFilteredData(newFilteredData); // 필터된 데이터 저장
    setSeries([
      {
        name: '뉴스 수',
        data: newFilteredData.map((d) => d.newsCount),
      },
      {
        name: '트래픽',
        data: newFilteredData.map((d) => d.traffic),
      },
    ]);
    setCategories(newFilteredData.map((d) => new Date(d.date).toISOString()));
    updateYAxisRange(newFilteredData); // Y축 범위 설정
  }, [data, selectedDays]);

  const updateYAxisRange = (filteredData: { newsCount: number; traffic: number }[]) => {
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
    const matchedDetail = detail && Array.isArray(detail) && clickedData.date 
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
      type: 'area' as const,
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
          chart.el.addEventListener('wheel', handleWheel);
        },
        click: handleDataPointSelection, // 클릭 이벤트
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const,
    },
    xaxis: {
      type: 'datetime' as const,
      categories: categories,
      labels: {
        formatter:         (value: string) => formatDate(value),
        style: {
          colors: '#FFFFFF',
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
              ${formattedDate}
            </div>
            <div style="margin-bottom: 12px;">
              <strong style="font-size: 14px; color: #4CAF50;">Top 3 주식:</strong>
              <div>${selectedData.topStocks[0]}</div>
              <div>${selectedData.topStocks[1]}</div>
              <div>${selectedData.topStocks[2]}</div>
            </div>
            <div style="border-top: 1px solid #fff; padding-top: 10px;">
              <strong>뉴스 수:</strong> ${series[0][dataPointIndex]}
              <br />
              <strong>트래픽:</strong> ${series[1][dataPointIndex]}
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

      <Chart options={options} series={series} type="area" height={350} width={650} />

      {/* 모달이 열려 있을 경우 모달 표시 */}
      {isModalOpen && modalData && <Modal onClose={() => setIsModalOpen(false)} modalData={modalData} />}
    </ChartContainer>
  );
};

export default AreaChart;

