import styled from '@emotion/styled';
import Image from 'next/image';
import timeIcon from '@/public/images/planet/timeIcon.png'

const TimeMachineButtonGroup = ({ bottom = '30px', right = '100px' }) => {
  return (
    <ButtonGroup bottom={bottom} right={right}>
      <Icon>
        <Image src={timeIcon} alt="타임머신" width={50} height={50} />
      </Icon>
      <Text>타임머신</Text>
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div<{ bottom: string; right: string }>`
  position: fixed;
  bottom: ${({ bottom }) => bottom}; // 동적으로 위치 설정
  right: ${({ right }) => right}; // 동적으로 위치 설정
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  z-index: 1000;
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

export default TimeMachineButtonGroup;
