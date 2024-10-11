import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: hidden;
  padding: 15px 20px;
`;

export const Section = styled.div`
  min-width: 100vw;
  flex: 0 0 100vw;
  margin: 40px 20px; /* 섹션에 패딩 추가 */
`;

export const SectionContainer = styled.div`
  width: 100vw;
  flex: 0 0 80vw;
  display: flex;
  gap: 20px;
  padding: 10px 5%; /* 좌우 패딩을 추가하여 화면의 5% 여유 공간 */
  align-items: stretch; /* 높이를 맞추기 위한 설정 */
  justify-content: center;

  & > div {
    background-color:  rgba(255, 255, 255, 0.8);
    // border: 1px solid;
    // border-color: rgba(255, 255, 255, 0.4);
    border-radius: 15px;
    height: 500px;
    overflow: hidden;
  }

  /* NewsList가 65%, WordCloudComponent가 35% */
  .news-list {
    flex: 0 0 65%;
    overflow: auto;
    scrollbar-width: none; /* 스크롤바 숨기기 */
    scroll-radius: 15px;
  }

  .word-cloud {
    flex: 0 0 35%;
  }
`;

export const NavBarWrapper = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding:5px 0;
  position: relative;
  left: 0;
  right: 0;
  height: 40px;
  z-index: 1001;
`;

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 60px;
  color: white;
  position: relative;
  height: 60px;
  z-index: 1000;
  border-radius: 10px;
  margin: 30px 100px 30px;

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px); /* 위에서 아래로 슬라이드 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 모달 오버레이 (배경)
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6); /* 투명도 있는 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(5px); /* 배경 블러 효과 */
`;

// 모달 컨텐츠
export const ModalContent = styled.div`
  background-color: #ffffff;
  border-radius: 16px; /* 모서리 라운딩 */
  width: 80%;
  max-width: 600px; /* 최대 너비 설정 */
  max-height: 80vh;
  padding: 40px;
  box-shadow: 0px 15px 40px rgba(0, 0, 0, 0.2); /* 섬세한 그림자 효과 */
  animation: fadeIn 0.3s ease-in-out;
  overflow-y: auto; /* 필요시 스크롤바 생성 */
  scrollbar-width: none; /* 스크롤바 숨기기 */

  text-align: left;
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 30px; /* 타이틀과 내용 사이의 여백 */
  }

  img {
    width: 80%; /* 이미지 너비 전체 사용 */
    height: auto;
    border-radius: 8px; /* 이미지 모서리 라운딩 */
    margin-bottom: 20px; /* 이미지와 텍스트 사이의 여백 */
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 1.5; /* 줄 간격 */
    margin-bottom: 15px; /* 단락 간 여백 */
  }

  .news-meta {
    display: flex;
    justify-content: space-between; /* 날짜와 신문사를 양 끝으로 정렬 */
    font-size: 14px;
    color: #888;
    margin-bottom: 10px; /* 메타 정보와 키워드 사이의 여백 */
  }

  .keywords {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* 키워드 간의 간격 */
    align-items: center;

    span {
      background: #f0f0f0;
      border-radius: 10px; /* 키워드 태그 모서리 라운딩 */
      padding: 5px 10px; /* 키워드 내부 패딩 */
      font-size: 14px;
      color: #555;
    }
    .news-header {
      margin-top: 50px;
    }
  }

  @media (max-width: 768px) {
    padding: 30px 20px; /* 모바일 뷰에서 패딩 조정 */
    width: 90%; /* 모바일 뷰에서 너비 조정 */
  }
`;

export const NewsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  overflow-y: scroll;  
  max-height: 90%; /* 높이 고정 */
  
   &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #888; /* 호버 시 진한 회색으로 변경 */
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;


export const NewsItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.5s ease, box-shadow 0.3s ease;
  padding: 6px;
  margin: 5px 10px;
  cursor: pointer;
  min-height: 75px; /* 최소 높이 설정 */
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const NewsImage = styled.img`
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const NewsContent = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

export const NewsTitle = styled.h3`
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #333;
`;

export const NewsSummary = styled.p`
  margin: 0 0 5px 0;
  font-size: 12px;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const NewsMeta = styled.div`
  font-size: 10px;
  color: #888;
  display: flex;
  justify-content: space-between;
`;
