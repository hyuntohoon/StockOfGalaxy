import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';




export const FavoriteListContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
max-height: 600px; /* 원하는 최대 높이 설정 */
overflow-y: auto; /* 세로 스크롤 가능 */
padding-right: 12px; /* 스크롤바와 컨텐츠 사이의 여백 */

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
  width: 8px; /* 스크롤바 너비 */
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1); /* 스크롤바 배경 색상, 투명도 적용 */
  border-radius: 10px; /* 스크롤바 트랙의 모서리 둥글게 */
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3); /* 스크롤바의 색상, 투명도 적용 */
  border-radius: 10px; /* 스크롤바의 모서리 둥글게 */
  margin-right: 2px; /* 스크롤바와 오른쪽 경계 사이의 여백 */
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5); /* 호버 시 스크롤바 색상, 투명도 적용 */
}
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale(0.95); // 크기 감소 효과 추가 (선택 사항)
  }
`;

export const FavoriteItemContainer = styled.div<{ isRemoving?: boolean }>`
display: flex;
justify-content: space-between;
align-items: center;
background-color: rgba(31, 31, 31, 0.7); /* 투명도 0.7 설정 */
border-radius: 10px;
padding: 12px 20px;
margin-bottom: 10px;
color: #ffffff;
transition: opacity 0.4s ease; /* 애니메이션 추가 */
${({ isRemoving }) =>
  isRemoving &&
  css`
    animation: ${fadeOut} 0.5s forwards; /* 사라지는 애니메이션 적용 */
  `}
`;

export const LeftSection = styled.div`
display: flex;
align-items: center;
`;

export const Info = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
`;

export const RightSection = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`;

export const FavoriteButton = styled.div`
width: 24px; /* Adjust size as needed */
height: 24px;
cursor: pointer;
margin-left: 10px; /* Adjust margin as needed */
display: flex;
align-items: center;
justify-content: center;
position: relative;
transition: transform 0.2s ease; /* 애니메이션 추가 */

&:hover {
  transform: scale(1.1); /* 호버 시 아이콘 크기 증가 */
}
`;

export const FavoriteIconWrapper = styled.div<{ isFavorite: boolean }>`
position: absolute;
width: 24px;
height: 24px;
transition: opacity 0.4s ease;
opacity: ${({ isFavorite }) => (isFavorite ? 1 : 0.5)};
`;

export const IconWrapper = styled.div<{ size: string }>`
width: ${({ size }) => size};
height: ${({ size }) => size};
border-radius: 50%;
overflow: hidden; // 이미지가 원형으로 보이도록 하기 위해 필요
margin-right: 15px;
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  margin: 0;
  color: #ffffff;
`;

interface TextProps {
    color?: string;
    size?: string;
    weight?: string;
  }
  
  export const Text = styled.span<TextProps>`
    color: ${({ color }) => color || '#ffffff'};
    font-size: ${({ size }) => size || '16px'};
    font-weight: ${({ weight }) => weight || 'normal'};
  `;
  
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const FavoritesContainer = styled.div<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    width: ${isOpen ? '350px' : '250px'};
    height: ${isOpen ? 'fit-content' : '27px'};
    background-color: ${isOpen ? 'rgba(245, 245, 245, 0.35)' : 'rgba(245, 245, 245, 0.15)'};
    padding: 20px;
    color: #000;
    border-radius: 15px;
    margin: 20px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    transition: height 0.3s ease, padding 0.3s ease, width 0.3s ease, background-color 0.4s ease;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: ${isOpen ? 'auto' : 'pointer'};
    
    &:not([data-isopen='true']):hover {
      background-color: ${isOpen ? 'rgba(245, 245, 245, 0.35)' : 'rgba(245, 245, 245, 0.25)'};
      box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.3);
    }
  `}
`;

export const ToggleButton = styled.button`
  background-color: transparent;
  padding-top: 10px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 30px;
  z-index: 10;
  font-size: 2rem;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #000;
  }
`;

export const FavoriteHeader = styled.h2<{ isOpen: boolean }>`
  ${({ isOpen }) => css`
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.3rem;
    color: ${isOpen ? '#222' : '#CCC'};
    transition: color 0.3s ease;
  `}
`;
