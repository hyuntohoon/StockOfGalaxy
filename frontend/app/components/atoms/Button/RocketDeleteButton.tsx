import { FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

interface RocketDeleteButtonProps {
  authorId: number;
  currentUserId: number;
  onDelete: () => void;
}

const RocketDeleteButton = ({ authorId, currentUserId, onDelete }: RocketDeleteButtonProps) => {
  if (authorId !== currentUserId) return null;

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
