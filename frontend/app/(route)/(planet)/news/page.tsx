// NewsPageHeader.tsx
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import WordCloudComponent from './WordCloudComponent'; // 경로를 실제 파일 위치에 맞게 조정하세요

// 스타일 컴포넌트 정의

// 헤더 스타일
const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 60px;
  background: #282c34;
  color: white;
  position: relative; /* 고정 위치 */
  
  height: 60px; /* 헤더 높이 설정 */
  z-index: 1000; /* 네비게이션 바보다 아래에 표시 */
  border-radius: 10px;
  margin: 30px 100px 30px;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

// 헤더 내용 스타일
const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

// 로고 스타일
const Logo = styled.img`
  height: 40px;
`;

// 주식 정보 스타일
const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 16px;
`;

// 네비게이션 바 스타일
const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px 0;
  position: relative; /* 고정 위치 */
  left: 0;
  right: 0;
  height: 50px; /* 네비게이션 바 높이 설정 */
  z-index: 1001; /* 헤더보다 위에 표시 */
`;

// 네비게이션 버튼 스타일
const NavButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.active ? '#61dafb' : 'white')};
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: ${(props) => (props.active ? '2px solid #61dafb' : 'none')};
  
  &:hover {
    color: #61dafb;
  }
`;

// 스크롤 프로그레스 바 스타일 정의
const ScrollProgress = styled.div<{ progress: number }>`
  position: relative;
  height: 3px;
  background: #ddd;
  z-index: 999;
  margin: 0px 30px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.progress}%;
    background: #61dafb;
    transition: width 0.2s ease;
  }
`;

// 콘텐츠 컨테이너 스타일 정의 (가로 스크롤)
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  padding: 15px 20px 20px 20px; /* 상단 패딩 조정 (Header + NavBar + ScrollProgress 높이) */
  gap: 20px;
  scroll-behavior: smooth;
  
  /* Hide scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

// 개별 섹션 스타일
const Section = styled.div`
  min-width: 100vw;
  flex: 0 0 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// 섹션 제목 스타일
const SectionTitle = styled.h2`
  color: white;
  margin-bottom: 10px;
  text-align: center;
  width: 100%;
  max-width: 1200px;
`;

// InnerContainer 스타일 정의
const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

// 뉴스 및 워드 클라우드 컨테이너 스타일
const NewsContainer = styled.div`
  flex: 3;
  padding: 20px;
  background-color: #f0f0f0; /* 밝은 배경색 */
  border-radius: 8px;
  height: 400px; /* 예시 높이 설정 */
  overflow: auto;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const WordCloudContainer = styled.div`
  flex: 2;
  background-color: #e8e8e8; /* 조금 더 어두운 배경색 */
  border-radius: 8px;
  height: 440px; /* 예시 높이 설정 */
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// NewsList 관련 스타일
const NewsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 간격 줄임 */
`;

const NewsItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.5s ease, box-shadow 0.3s ease; /* 애니메이션 추가 */
  padding: 10px; /* 패딩 감소 */

  &:hover {
    transform: scale(1.02); /* 약간 확대 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 그림자 강화 */
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NewsImage = styled.img`
  width: 100px; /* 너비 감소 */
  height: 80px; /* 높이 감소 */
  object-fit: cover;
  border-radius: 5px; /* 이미지 둥글게 */
  margin-right: 10px; /* 이미지와 내용 간격 조정 */
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const NewsContent = styled.div`
  padding: 10px; /* 패딩 감소 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const NewsTitle = styled.h3`
  margin: 0 0 5px 0; /* 마진 감소 */
  font-size: 16px; /* 폰트 크기 감소 */
  color: #333;
`;

const NewsSummary = styled.p`
  margin: 0 0 5px 0; /* 마진 감소 */
  font-size: 12px; /* 폰트 크기 감소 */
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 두 줄로 제한 */
  -webkit-box-orient: vertical;
`;

const NewsMeta = styled.div`
  font-size: 10px; /* 폰트 크기 감소 */
  color: #888;
  display: flex;
  justify-content: space-between;
`;


// TypeScript 인터페이스 정의
interface News {
  id: number;
  title: string;
  content: string;
  write_date: string;
  신문사: string;
  img: string;
}

// 예시 뉴스 데이터 (5개)
const sampleNews: News[] = [
  {
    id: 1,
    title: 'React 18 출시',
    content: 'React 18이 새로운 기능과 성능 개선과 함께 출시되었습니다.',
    write_date: '2024-04-20',
    신문사: '조선일보',
    img: '/images/logo/samsung.png',
  },
  {
    id: 2,
    title: 'Next.js 13 업데이트',
    content: 'Next.js 13에서 새로운 라우팅 시스템과 빌드 최적화가 도입되었습니다.',
    write_date: '2024-04-18',
    신문사: '동아일보',
    img: '/images/logo/samsung.png',
  },
  {
    id: 3,
    title: 'TypeScript 5.0 발표',
    content: 'TypeScript 5.0이 다양한 개선사항과 새로운 기능을 포함하여 발표되었습니다.',
    write_date: '2024-04-15',
    신문사: '중앙일보',
    img: '/images/logo/samsung.png',
  },
  {
    id: 4,
    title: 'Emotion Styled 소개',
    content: 'Emotion Styled를 활용한 효율적인 스타일링 방법에 대해 알아봅니다.',
    write_date: '2024-04-10',
    신문사: '한겨레',
    img: '/images/logo/samsung.png',
  },
  {
    id: 5,
    title: '프론트엔드 최적화 팁',
    content: '프론트엔드 애플리케이션의 성능을 최적화하기 위한 유용한 팁을 소개합니다.',
    write_date: '2024-04-05',
    신문사: '매일경제',
    img: '/images/logo/samsung.png',
  },
];

// NewsList 컴포넌트
const NewsList: React.FC<{ news: News[] }> = ({ news }) => {
  return (
    <NewsListWrapper>
      {news.map((item) => (
        <NewsItem key={item.id}>
          <NewsImage src={item.img} alt={item.title} />
          <NewsContent>
            <div>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsSummary>{item.content}</NewsSummary>
            </div>
            <NewsMeta>
              <span>{item.write_date}</span>
              <span>{item.신문사}</span>
            </NewsMeta>
          </NewsContent>
        </NewsItem>
      ))}
    </NewsListWrapper>
  );
};

// 디바운스 함수 정의
const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// NewsPageHeader 컴포넌트 수정
const NewsPageHeader: React.FC = () => {
  // Refs for sections
  const homeRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const stocksRef = useRef<HTMLDivElement>(null);
  const planetNewsRef = useRef<HTMLDivElement>(null);
  const spaceNewsRef = useRef<HTMLDivElement>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('홈');

  useEffect(() => {
    // 디바운스된 스크롤 핸들러 정의
    const handleScroll = debounce(() => {
      if (contentRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = contentRef.current;
        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setScrollProgress(progress);

        // 현재 섹션 감지
        const scrollPosition = scrollLeft + clientWidth / 2; // 화면 중앙 기준
        const sections = [
          { name: '홈', ref: homeRef },
          { name: '차트', ref: chartRef },
          { name: '종목', ref: stocksRef },
          { name: '행성소식', ref: planetNewsRef },
          { name: '우주소식', ref: spaceNewsRef },
        ];

        for (let section of sections) {
          if (section.ref.current) {
            const sectionLeft = section.ref.current.offsetLeft;
            const sectionWidth = section.ref.current.offsetWidth;
            if (scrollPosition >= sectionLeft && scrollPosition < sectionLeft + sectionWidth) {
              setActiveSection(section.name);
              break;
            }
          }
        }

        // 가장 가까운 섹션 찾기
        let closestSection: { name: string; ref: React.RefObject<HTMLDivElement> } | null = null;
        let minDistance = Infinity;

        sections.forEach((section) => {
          if (section.ref.current && contentRef.current) {
            const sectionCenter = section.ref.current.offsetLeft + section.ref.current.offsetWidth / 2;
            const containerCenter = scrollLeft + clientWidth / 2;
            const distance = Math.abs(sectionCenter - containerCenter);
            if (distance < minDistance) {
              minDistance = distance;
              closestSection = section;
            }
          }
        });

        if (closestSection && closestSection.ref.current) {
          scrollToSection(closestSection.ref);
        }
      }
    }, 100); // 100ms 디바운스 딜레이

    const currentRef = contentRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }

    // 초기 스크롤 프로그레스 설정
    handleScroll();

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // 워드 클라우드 데이터 메모이제이션
  const wordData = useMemo(
    () => [
      { text: "개발", value: 6 },
      { text: "자바스크립트", value: 8 },
      { text: "리액트", value: 4 },
      { text: "프로그래밍", value: 5 },
      { text: "코딩", value: 4 },
      { text: "디자인", value: 4 },
      { text: "배우기", value: 4 },
      { text: "웹", value: 3 },
      { text: "앱", value: 3 },
      { text: "기술", value: 3 },
      { text: "HTML", value: 3 },
      { text: "CSS", value: 3 },
      { text: "알고리즘", value: 3 },
      { text: "문제해결", value: 2 },
      { text: "도전", value: 2 },
      { text: "창의성", value: 2 },
      { text: "열정", value: 2 },
      { text: "성장", value: 2 },
    ],
    []
  );

  // 섹션으로 스크롤하는 함수
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

  return (
    <>
      {/* 헤더 추가 */}
      <Header>
        <HeaderContent>
          {/* 로고 이미지 사용 시, src 속성을 실제 로고 경로로 변경하세요 */}
          <Logo src="/logo.png" alt="Logo" />
          <StockInfo>
            <span>74,600원 +500원 (+0.6%)</span>
            <div>기타 정보</div>
          </StockInfo>
        </HeaderContent>
      </Header>
      
      {/* 네비게이션 바 추가 */}
      <NavBar>
        <NavButton active={activeSection === '홈'} onClick={() => scrollToSection(homeRef)}>
          홈
        </NavButton>
        <NavButton active={activeSection === '차트'} onClick={() => scrollToSection(chartRef)}>
          차트
        </NavButton>
        <NavButton active={activeSection === '종목'} onClick={() => scrollToSection(stocksRef)}>
          종목
        </NavButton>
        <NavButton active={activeSection === '행성소식'} onClick={() => scrollToSection(planetNewsRef)}>
          행성소식
        </NavButton>
        <NavButton active={activeSection === '우주소식'} onClick={() => scrollToSection(spaceNewsRef)}>
          우주소식
        </NavButton>
      </NavBar>
      
      {/* 스크롤 프로그레스 바 */}
      <ScrollProgress progress={scrollProgress} />
      
      {/* 콘텐츠 컨테이너 */}
      <ContentContainer ref={contentRef}>
        {/* 홈 섹션 */}
        <Section ref={homeRef}>
          <InnerContainer>
            {/* 홈 섹션 내용 */}
            <p>홈 페이지 내용</p>
          </InnerContainer>
        </Section>
        
        {/* 차트 섹션 */}
        <Section ref={chartRef}>
          <InnerContainer>
            {/* 차트 섹션 내용 */}
            <p>차트 페이지 내용</p>
          </InnerContainer>
        </Section>
        
        {/* 종목 섹션 */}
        <Section ref={stocksRef}>
          <InnerContainer>
            {/* 종목 섹션 내용 */}
            <p>종목 페이지 내용</p>
          </InnerContainer>
        </Section>
        
        {/* 행성소식 섹션 */}
        <Section ref={planetNewsRef}>
          <InnerContainer>
            <NewsContainer>
              <NewsList news={sampleNews} />
            </NewsContainer>
            <WordCloudContainer>
              <WordCloudComponent data={wordData} />
            </WordCloudContainer>
          </InnerContainer>
        </Section>
        
        {/* 우주소식 섹션 */}
        <Section ref={spaceNewsRef}>
          <InnerContainer>
            <NewsContainer>
              <NewsList news={sampleNews} />
            </NewsContainer>
            <WordCloudContainer>
              <WordCloudComponent data={wordData} />
            </WordCloudContainer>
          </InnerContainer>
        </Section>
      </ContentContainer>
    </>
  );
};

export default NewsPageHeader;
