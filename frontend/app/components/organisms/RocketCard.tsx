import React from 'react';
import styled from '@emotion/styled';
import ProfileImage from '../atoms/ProfileImage';
import RocketContent from '../atoms/Text/RocketContent';
import RocketTimeStamp from '../atoms/Text/RocketTimeStamp';
import RocketTimeMachineButton from '../atoms/Button/RocketTimeMachineButton';
import RocketDeleteButton from '../atoms/Button/RocketDeleteButton';
import RocketPriceGroup from '../molecules/ButtonGroup/RocketPriceGroup';


const handleDelete = () => {
  // todo: 로켓 삭제 api 호출
  alert('로켓 삭제 api 호출 필요')
};


const RocketCard = ({ data }) => {
  return (
    <Content>
      <Header>
        <ProfileImageWrapper>
          <ProfileImage src={data.imageUrl} alt="프로필" />
        </ProfileImageWrapper>
        <NamePriceWrapper>
          <NameAndDelete>
            <Name>{data.nickname}</Name>
            {/* todo: 실제 유저 데이터로 변경 */}
            <RocketDeleteButton
              authorId={data.userId}
              currentUserId={1}
              onDelete={handleDelete}
            />
          </NameAndDelete>
          <RocketPriceGroup
            price={data.price}
            priceChange={data.priceChange}
            priceChangeSign={data.priceChangeSign}
          />
        </NamePriceWrapper>
      </Header>
      <StyledRocketContent message={data.message} />
      <TimeStampTimeMachineWrapper>
        <RocketTimeStamp createdAt={data.createdAt} />
        <RocketTimeMachineButton />
      </TimeStampTimeMachineWrapper>
    </Content>
  );
};

const Content = styled.div`
  position: relative;
  width: 216px;
  height: 190px;
  background-color: #d2d1d0;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden;
  overflow-y: auto;

  /* 스크롤바 커스텀 스타일링 */
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #848484;
    border-radius: 20px;
    transition: background-color 0.3s;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #84848484;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 20px;
  }
`;

const StyledRocketContent = styled(RocketContent)`
  overflow-y: auto;
  margin-bottom: 4px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const ProfileImageWrapper = styled.div`
  flex-shrink: 0;
`;

const NamePriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;

const NameAndDelete = styled.div`
  display: flex;
  margin-left: 4px;
  margin-bottom: 4px;
  align-items: center;
  width: 100%;
`;

const Name = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

const TimeStampTimeMachineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 5px;
`;

export default RocketCard;
