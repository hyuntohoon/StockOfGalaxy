import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';


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
  
  & > div {
    background-color: #f0f0f0;
    border-radius: 15px;
    height: 450px;
    overflow: hidden;
  }
  
  /* NewsList가 65%, WordCloudComponent가 35% */
  .news-list {
    flex: 0 0 65%;
    overflow: auto;
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
  padding: 10px 0;
  position: relative;
  left: 0;
  right: 0;
  height: 50px;
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

export const ModalOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.7);
display: flex;
justify-content: center;
align-items: center;
z-index: 10000;
`;

export const ModalContent = styled.div`
background: white;
padding: 20px;
border-radius: 8px;
width: 500px;
max-width: 90%;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
animation: ${fadeIn} 0.3s ease; /* 애니메이션 추가 */
`;


export const NewsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
`;

export const NewsItem = styled.div`
  display: flex;
  background-color: white;
  border-radius: 7px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.5s ease, box-shadow 0.3s ease;
  padding: 6px;
  cursor: pointer; // 클릭할 수 있도록 커서 변경

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
