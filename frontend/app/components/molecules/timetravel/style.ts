import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

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
  background-color: rgba(255, 255, 255, 0.95); /* 약간 투명한 배경 */
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-width: 90%;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out; /* 애니메이션 적용 */

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
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
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0070f3;
  color: #fff;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #005bb5;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #e0e0e0;
  color: #333;
  font-size: 14px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #bdbdbd;
  }
`;
