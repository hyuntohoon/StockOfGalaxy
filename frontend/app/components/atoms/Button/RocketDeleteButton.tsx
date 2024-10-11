import { FaTrashAlt } from "react-icons/fa";
import styled from '@emotion/styled';
interface RocketDeleteButtonProps {
  authorId: number;
  currentMemberId: number;
  onDelete: () => void;
}

const RocketDeleteButton = ({ authorId, currentMemberId, onDelete }: RocketDeleteButtonProps) => {
  if (authorId !== currentMemberId) return null;

  return (
    <StyledIcon onClick={onDelete}>
      <FaTrashAlt />
    </StyledIcon>
  );
};

const StyledIcon = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  color: #3D3D3D;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease; /* 색상 및 크기 변경에 대한 트랜지션 추가 */

  &:hover {
    color: #d44040; /* 호버 시 색상 변경 (토마토색) */
    transform: scale(1.2); /* 호버 시 크기 1.2배로 확대 */
  }
`;


export default RocketDeleteButton;
