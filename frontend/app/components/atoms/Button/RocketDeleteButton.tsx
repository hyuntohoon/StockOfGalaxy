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
`;

export default RocketDeleteButton;
