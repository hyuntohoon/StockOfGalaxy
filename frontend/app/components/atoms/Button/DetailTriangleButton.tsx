import styled from '@emotion/styled';
import { GoTriangleUp } from "react-icons/go";

const DetailTriangleButton = () => {
  return (
    <Button>
      <GoTriangleUp />
    </Button>
  );
};

const Button = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%); /* 중앙 정렬 */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  cursor: pointer;
  z-index: 1000;

  &:hover {
    color: #c6b6d0; /* 호버시 색상 변경 */
  }
`;

export default DetailTriangleButton;
