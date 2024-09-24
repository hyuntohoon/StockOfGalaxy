import styled from '@emotion/styled';
import Image from 'next/image';
import rocketIcon from '@/public/images/planet/rocketIcon.png'

const RocketButtonGroup = ({ onRocketClick }) => {
  return (
    <ButtonGroup onClick={onRocketClick}>
      <Icon>
        <Image src={rocketIcon} alt="로켓" width={50} height={50} />
      </Icon>
      <Text>로켓</Text>
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div`
  position: fixed;
  bottom: 30px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  z-index: 1000;
  cursor: pointer;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #fff;
  margin-top: 3px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

export default RocketButtonGroup;
