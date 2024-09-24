import styled from '@emotion/styled';
import Image from 'next/image';
import rocket from '@/public/images/rocket/rockett.png'


const CreateRocketButton = ({ onClick }) => {


  const handleSubmit = (e) => {
    // todo: api 연동
  };

  return (
    <Button onClick={handleSubmit}>
      <Text>로켓 쏘기</Text>
      <Icon>
        <Image src={rocket} alt="로켓쏘기" width={25} height={20} />
      </Icon>
    </Button>
  );
};

const Button = styled.button`
  height: 60px;
  width: 90px;
  background-color: #202938;
  border-radius: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  border: none;
`;

const Icon = styled.div`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  color: #fff;
  margin-top: 8px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

export default CreateRocketButton;