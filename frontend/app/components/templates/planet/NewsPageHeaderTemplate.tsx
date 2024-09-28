"use client";

import React, { useRef, useState, useEffect } from "react";
import Header from "@/app/components/organisms/planet/Header";
import StockHeaderTemplate from "../../organisms/stock/StockHeaderTemplate";
import NavBar from "@/app/components/molecules/planet/NavBar";
import NewsList from "@/app/components/organisms/planet/NewsList";
import WordCloudComponent from "@/app/components/molecules/planet/WordCloudComponent";
import { debounce } from "@/app/utils/libs/debounce";
import { ContentContainer, SectionContainer } from "@/app/styles/planet";
import ChartTemplate from "@/app/components/templates/chart/ChartTemplate";
import StockInfoTemplate from "@/app/components/templates/stock/StockInfoTemplate";
import StockDailyPriceTemplate from "@/app/components/organisms/stock/StockDailyPriceTeplate";
import styled from "@emotion/styled";

const ChartContainer = styled.div`
  min-width: 100%;
  width: 100%;
  max-width: 100%;
  height: auto;
  display: flex;
`;

interface NewsPageHeaderTemplateProps {
  newsData: any[]; // NewsPage에서 전달받은 뉴스 데이터 타입을 지정
  wordData1: any[]; // 첫 번째 워드 클라우드 데이터
  wordData2: any[]; // 두 번째 워드 클라우드 데이터
}

const NewsPageHeaderTemplate: React.FC<NewsPageHeaderTemplateProps> = ({
  newsData,
  wordData1,
  wordData2,
}) => {
  const homeRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const stocksRef = useRef<HTMLDivElement>(null);
  const planetNewsRef = useRef<HTMLDivElement>(null);
  const spaceNewsRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>("홈");

  const sections = [
    { name: "홈", ref: homeRef },
    { name: "차트", ref: chartRef },
    { name: "종목", ref: stocksRef },
    { name: "행성소식", ref: planetNewsRef },
    { name: "우주소식", ref: spaceNewsRef },
  ];

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
          <div className="news-list">
            <ChartTemplate />
          </div>
          <div className="word-cloud">
            <StockDailyPriceTemplate />
          </div>
        </SectionContainer>

        <SectionContainer ref={stocksRef}>
          <div className="news-list">
            <StockInfoTemplate />
          </div>
          <div className="word-cloud"></div>
        </SectionContainer>

        <SectionContainer ref={planetNewsRef}>
          <div className="news-list">
            {/* API에서 받은 데이터를 렌더링 */}
            <NewsList news={newsData} />
          </div>
          <div className="word-cloud">
            <WordCloudComponent data={wordData1} width={500} height={440} />
          </div>
        </SectionContainer>

        <SectionContainer ref={spaceNewsRef}>
          <div className="news-list">
            <NewsList news={newsData} />
          </div>
          <div className="word-cloud">
            <WordCloudComponent data={wordData2} width={500} height={440} />
          </div>
        </SectionContainer>
      </ContentContainer>
    </>
  );
};

export default NewsPageHeaderTemplate;
