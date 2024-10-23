import styled from "@emotion/styled";
import Link from "next/link";

export const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto; // 자동 높이
  width: auto; // 자동 너비
  min-width: 300px; // 최소 너비를 설정하여 작은 화면에서도 보기 좋게
  background: rgba(255, 255, 255, 0.15);
  border-radius: 30px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); // 그림자를 추가하여 부각시킴
`;

export const LinkContainer = styled.div`
  align-self: flex-end;
  margin: 10px 20px;
  text-align: right;
`;

export const StyledLink = styled(Link)`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease-in-out, text-decoration 0.4s ease;

  &:hover {
    color: rgba(255, 255, 255, 1);
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const FormInput = styled.input`
  color: white;
  border: none;
  border-radius: 25px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* 그림자의 투명도 조정 */
  padding: 10px 20px;
  width: 450px;
  height: 40px;
  font-size: 1.1rem;
  background-color: rgba(254, 254, 254, 0.2);
  transition: all 0.3s;

  &:focus {
    box-shadow: 0 0 6px rgba(81, 203, 238, 0.8); /* 포커스 시 밝은 푸른색 그림자 */
    outline: none; /* 기본 아웃라인 제거 */
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.45); /* 플레이스홀더 색상 및 투명도 */
  }
`;

interface StyledLoginButtonProps {
  value: string;
  primary?: boolean;
}

export const FormButton = styled.input<StyledLoginButtonProps>`
  color: black;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  width: 140px;
  height: 50px;
  font-size: 1rem;
  font-weight: bold;

  background-color: linear-gradient(145deg, #6247aa, #5b2ac5);
  cursor: pointer;
  transition: background 0.4s, box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: #490070;
    color: white;
  }

  &:active {
    transform: translateY(2px);
  }
`;

export const CheckButton = styled.button`
  position: absolute;
  right: 20px;
  padding: 8px 12px;
  border: none;
  border-radius: 12px;
  background: #490070;
  color: white;
  font-size: 0.8rem;
  font-weight: 600; // 글씨체를 조금 더 굵게
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); // 그림자 추가
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.005); // 버튼을 약간 확대
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3); // 호버 상태에서 그림자 변경
  }

  &:active {
    background: #533a9d;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  }
`;
