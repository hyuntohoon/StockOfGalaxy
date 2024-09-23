'use client';

import React, { useRef, useState, useEffect } from 'react';
import Header from '@/app/components/organisms/planet/Header';
import NavBar from '@/app/components/molecules/planet/NavBar';
import NewsList from '@/app/components/organisms/planet/NewsList';
import WordCloudComponent from '@/app/components/molecules/planet/WordCloudComponent';
import { sampleNews } from '@/app/mocks/sampleNews';
import { wordData } from '@/app/mocks/wordData';
import { debounce } from '@/app/utils/libs/debounce';
import { ContentContainer, Section, SectionContainer } from '@/app/styles/planet'; // 스타일 컴포넌트 분리

const NewsPageHeaderTemplate: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const stocksRef = useRef<HTMLDivElement>(null);
  const planetNewsRef = useRef<HTMLDivElement>(null);
  const spaceNewsRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('홈');

  const sections = [
    { name: '홈', ref: homeRef },
    { name: '차트', ref: chartRef },
    { name: '종목', ref: stocksRef },
    { name: '행성소식', ref: planetNewsRef },
    { name: '우주소식', ref: spaceNewsRef },
  ];

  useEffect(() => {
    const handleScroll = debounce(() => {
      if (contentRef.current) {
        const { scrollLeft, clientWidth } = contentRef.current;
        const progress = (scrollLeft / (contentRef.current.scrollWidth - clientWidth)) * 100;
        setScrollProgress(progress);

        const scrollPosition = scrollLeft + clientWidth / 2;
        sections.forEach(({ name, ref }) => {
          if (ref.current) {
            const sectionLeft = ref.current.offsetLeft;
            const sectionWidth = ref.current.offsetWidth;
            if (scrollPosition >= sectionLeft && scrollPosition < sectionLeft + sectionWidth) {
              setActiveSection(name);
            }
          }
        });
      }
    }, 50);

    if (contentRef.current) {
      contentRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener('scroll', handleScroll);
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
        behavior: 'smooth',
      });
    }
  };

  const handleWheelScroll = (event: React.WheelEvent) => {
    if (
      contentRef.current &&
      planetNewsRef.current && spaceNewsRef.current &&
      !planetNewsRef.current.contains(event.target as Node) &&
      !spaceNewsRef.current.contains(event.target as Node)
    ) {
      contentRef.current.scrollTo({
        left: contentRef.current.scrollLeft + event.deltaY * 15,
        behavior: 'smooth',
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
      <Header />
      <NavBar activeSection={activeSection} scrollToSection={scrollToSection} sections={sections} />
      <ContentContainer onWheel={handleWheelScroll} ref={contentRef}>
      <SectionContainer ref={homeRef}>
        <p style={{ color: 'white' }}>홈 페이지 내용</p> 
        {/* 여기에 홈 요소 넣으면 됩니다 */}
      </SectionContainer>

        <SectionContainer ref={chartRef}>
          <p style={{ color: 'white' }}>차트 페이지 내용</p>
          {/* 여기에 차트 레이아웃 넣으면 됩니다 */}
        </SectionContainer>
        <SectionContainer ref={stocksRef}>
          <p style={{ color: 'white' }}>종목 페이지 내용</p>
          {/* 여기에 종목 레이아웃 넣으면 됩니다 */}
        </SectionContainer>
        
        <SectionContainer ref={planetNewsRef}>
          <div className="news-list">
            <NewsList news={sampleNews} />
          </div>
          <div className="word-cloud">
          <WordCloudComponent data={wordData} width={500} height={440} />
          </div>
        </SectionContainer>
        <SectionContainer ref={spaceNewsRef}>
          <div className="news-list">
            <NewsList news={sampleNews} />
          </div>
          <div className="word-cloud">
          <WordCloudComponent data={wordData} width={500} height={440} />
          </div>
        </SectionContainer>
      </ContentContainer>
    </>
  );
};

export default NewsPageHeaderTemplate;
