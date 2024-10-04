"use client";

import React, { useRef, useState, useEffect } from "react";
import StockHeaderTemplate from "../../organisms/stock/StockHeaderTemplate";
import NavBar from "@/app/components/molecules/planet/NavBar";
import NewsList from "@/app/components/organisms/planet/NewsList";
import WordCloudComponent from "@/app/components/molecules/planet/WordCloudComponent";
import { debounce } from "@/app/utils/libs/debounce";
import { ContentContainer, SectionContainer } from "@/app/styles/planet";
import ChartTemplate from "@/app/components/templates/chart/ChartTemplate";
import StockInfoTemplate from "@/app/components/templates/stock/StockInfoTemplate";
import styled from "@emotion/styled";
import { useWheelScroll } from "@/app/hooks/useWheelScroll";
import { News } from "@/app/types/planet";
import FinancialMetricsChart from "../../molecules/stock/FinancialMetricsChart";
import StockDailyPriceTemplate from "../../organisms/stock/StockDailyPriceTemplate";
import NewsModal from "./NewsModal"

const ChartContainer = styled.div`
  width: 800px;
  height: auto;
`;

interface PlanetDetailTemplateProps {
  planetNews: News[]; // 행성 뉴스 데이터
  spaceNews: News[]; // 우주 뉴스 데이터
  planetWord: any[]; // 첫 번째 워드 클라우드 데이터 (행성 관련)
  spaceWord: any[]; // 두 번째 워드 클라우드 데이터 (우주 관련)
}

const PlanetDetailTemplate: React.FC<PlanetDetailTemplateProps> = ({
  planetNews,
  spaceNews,
  planetWord,
  spaceWord,
}) => {
  const homeRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const stocksRef = useRef<HTMLDivElement>(null);
  const planetNewsRef = useRef<HTMLDivElement>(null);
  const spaceNewsRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("홈");

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<News | null>(null); // 선택된 뉴스 상태

  const handleNewsClick = async (item: News) => {
    setSelectedNews(item); // 선택된 뉴스 설정
    setModalOpen(true); // 모달 열기
  };

  const sections = [
    { name: "홈", ref: homeRef },
    { name: "차트", ref: chartRef },
    { name: "종목", ref: stocksRef },
    { name: "행성소식", ref: planetNewsRef },
    { name: "우주소식", ref: spaceNewsRef },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current && contentRef.current) {
      const sectionLeft = ref.current.offsetLeft;
      const sectionWidth = ref.current.offsetWidth;
      const containerWidth = contentRef.current.clientWidth;
      const scrollTo = sectionLeft - (containerWidth / 2 - sectionWidth / 2);
      contentRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  useWheelScroll(contentRef, sections, scrollToSection);

  // 페이지가 마운트될 때 가로 스크롤 위치 복원
  useEffect(() => {
    const savedScrollPositionX = sessionStorage.getItem("scrollPositionX");
    if (savedScrollPositionX && contentRef.current) {
      contentRef.current.scrollTo({
        left: Number(savedScrollPositionX), // 저장된 가로 스크롤 위치로 복원
        behavior: "auto", // 애니메이션 없이 바로 스크롤
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (contentRef.current) {
        const { scrollLeft, clientWidth } = contentRef.current;
        const progress =
          (scrollLeft / (contentRef.current.scrollWidth - clientWidth)) * 100;
        setScrollProgress(progress);

        const scrollPosition = scrollLeft + clientWidth / 2;
        sections.forEach(({ name, ref }) => {
          if (ref.current) {
            const sectionLeft = ref.current.offsetLeft;
            const sectionWidth = ref.current.offsetWidth;
            if (
              scrollPosition >= sectionLeft &&
              scrollPosition < sectionLeft + sectionWidth
            ) {
              setActiveSection(name);
            }
          }
        });
      }
    }, 50);

    if (contentRef.current) {
      contentRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [sections, activeSection]);

  const handleWheelScroll = (event: React.WheelEvent) => {
    if (
      contentRef.current &&
      planetNewsRef.current &&
      spaceNewsRef.current &&
      !planetNewsRef.current.contains(event.target as Node) &&
      !spaceNewsRef.current.contains(event.target as Node)
    ) {
      contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft + event.deltaY * 15,
        behavior: "smooth",
      });

      setTimeout(() => {
        const { scrollLeft, clientWidth } = contentRef.current!;
        const scrollPosition = scrollLeft + clientWidth / 2;

        let closestSection = sections[0];
        let minDistance = Infinity;

        sections.forEach(({ name, ref }) => {
          if (ref.current) {
            const sectionLeft = ref.current.offsetLeft;
            const sectionWidth = ref.current.offsetWidth;
            const sectionCenter = sectionLeft + sectionWidth / 2;
            const distance = Math.abs(scrollPosition - sectionCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestSection = { name, ref };
            }
          }
        });

        if (closestSection.ref.current) {
          scrollToSection(closestSection.ref);
        }
      }, 1000);
    }
  };

  return (
    <>
      <StockHeaderTemplate />
      <NavBar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        sections={sections}
      />
      <ContentContainer onWheel={handleWheelScroll} ref={contentRef}>
        <SectionContainer ref={homeRef}>
          <p style={{ color: "white" }}>홈 페이지 내용</p>
        </SectionContainer>

        <SectionContainer ref={chartRef}>
          <ChartTemplate />
          <StockDailyPriceTemplate />
        </SectionContainer>

        <SectionContainer ref={stocksRef}>
          <StockInfoTemplate />
          <FinancialMetricsChart />
        </SectionContainer>

        <SectionContainer ref={planetNewsRef}>
          <div className="news-list">
            {/* 행성 뉴스 데이터 렌더링 */}
            <NewsList news={planetNews}  onClick={handleNewsClick}/>
          </div>
          <div className="word-cloud">
            <WordCloudComponent data={planetWord} width={500} height={440} />
          </div>
        </SectionContainer>

        <SectionContainer ref={spaceNewsRef}>
          <div className="news-list">
            {/* 우주 뉴스 데이터 렌더링 */}
            <NewsList news={spaceNews} onClick={handleNewsClick} />
          </div>
          <div className="word-cloud">
            <WordCloudComponent data={spaceWord} width={500} height={440} />
          </div>
        </SectionContainer>
      </ContentContainer>

      {/* 모달 컴포넌트 추가 */}
      {modalOpen && selectedNews && (
        <NewsModal
          news={selectedNews}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default PlanetDetailTemplate;
