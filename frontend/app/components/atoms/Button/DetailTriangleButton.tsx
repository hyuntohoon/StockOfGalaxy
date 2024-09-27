import styled from '@emotion/styled';
import { GoTriangleUp } from "react-icons/go";
import { useRouter, useParams } from 'next/navigation'; // next/navigation에서 useRouter와 useParams 가져오기
import { useRecoilValue } from 'recoil';
import { dateState } from '@/app/store/date';

const DetailTriangleButton = () => {
  const router = useRouter();
  const stockCode = useParams().stock;
  const date = useRecoilValue(dateState);
  
  const handleClick = () => {
    if (stockCode && date) {
      router.push(`/planet/detail/${stockCode}/${date}`);
    }
  };

  return (
    <Button onClick={handleClick}>
      <GoTriangleUp />
    </Button>
  );
};

const Button = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
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
