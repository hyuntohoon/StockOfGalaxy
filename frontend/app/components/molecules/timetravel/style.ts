import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


// Fade in 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Fade out 애니메이션 (추가적으로 필요하다면 구현)
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;
// Style.js

export const Wrapper = styled.div<{ float?: string; marginBottom?: number; width?: number; height?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  float: ${({ float }) => float || 'none'}; // float 속성 처리
  margin-bottom: ${({ marginBottom }) => (marginBottom ? `${marginBottom}px` : '15px')}; // marginBottom 속성 처리
  width: 'auto'; // width 속성 처리
  height: 'auto'; // height 속성 처리
`;


interface ButtonProps {
  width?: number; // Optional width
  height?: number; // Optional height
  backgroundColor?: string; // Optional background color
  position?: string; // Optional position property
  onClick?: () => void; // Optional click handler
  disabled?: boolean; // Optional disabled state
}

// Button styled component
export const Button = styled.button<ButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColor || '#007bff'}; /* 기본 색상 */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  width: ${({ width }) => (width ? `${width}px` : 'auto')}; /* width */
  height: ${({ height }) => (height ? `${height}px` : 'auto')}; /* height */
  position: ${({ position }) => position || 'static'}; /* position */

  &:hover {
    background-color: #0056b3; /* hover 시 색상 변경 */
  }

  &:disabled {
    background-color: #ccc; /* 비활성화 시 색상 변경 */
    cursor: not-allowed; /* 비활성화 시 커서 변경 */
  }
`;

export const ArrowLeft = styled(IoIosArrowBack)`
  font-size: 14px;
  background-color: transparent;
  color: black; /* 아이콘 색상 변경 */
`;

export const ArrowRight = styled(IoIosArrowForward)`
  font-size: 14px;
  background-color: transparent;
  color: black; /* 아이콘 색상 변경 */
`;

// 스타일링
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
  animation: ${fadeIn} 0.5s ease-out;
`;

export const ModalContent = styled.div`
  background-color: #ffffffe8;
  padding: 20px 50px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;

  .close-button {
    position: absolute;
    top: 12px;
    right: 14px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 20px;
    color: black;
  }

  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
`;


export const ConfirmButton = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: #0e224d;
  color: #fff;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3B4C6E;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  background-color: #DBDBDB;
  color: #333;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #bdbdbd;
  }
`;
