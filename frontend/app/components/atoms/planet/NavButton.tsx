import styled from '@emotion/styled';

const NavButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.active ? '#61dafb' : 'white')};
  font-size: 16px;
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: ${(props) => (props.active ? '2px solid #61dafb' : 'none')};
  z-index: 0;
  &:hover {
    color: #61dafb;
  }
`;

export default NavButton;
