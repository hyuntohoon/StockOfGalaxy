import styled from '@emotion/styled';
import { ReactNode } from 'react';
import Title from '../atoms/common/Title';

// Props 타입 정의
interface HeaderButtonGroupProps {
  icon: ReactNode;
  label: string;
}

const HeaderButtonGroup = ({ icon, label }: HeaderButtonGroupProps) => {
  return (
    <ButtonGroup>
      <ButtonContainer>{icon}</ButtonContainer>
      <Text>{label}</Text>
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  background-color: #393939;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  color: #fff;
  font-size: 26px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: black;
  margin-top: 5px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

export default HeaderButtonGroup;
