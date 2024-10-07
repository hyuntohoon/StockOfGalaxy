import styled from '@emotion/styled';
import { ReactNode } from 'react';

// Props 타입 정의
interface HeaderModalButtonGroupProps {
  icon: ReactNode;
  label: string;
}

const HeaderModalButtonGroup = ({ icon, label }: HeaderModalButtonGroupProps) => {
  return (
    <ButtonGroup>
      <ButtonContainer>{icon}</ButtonContainer>
      <Text>{label}</Text>
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 140px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  width: 18px;
  height: 18px;
  padding-inline: 8px;
  padding-block: 8px;
  display: flex;
  color: #fff;
  font-size: 26px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #000000;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
`;

export default HeaderModalButtonGroup;
