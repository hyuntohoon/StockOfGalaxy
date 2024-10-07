import React from 'react';
import styled from '@emotion/styled';
import ProfileImage from '../atoms/ProfileImage';
import RocketContent from '../atoms/Text/RocketContent';
import RocketTimeStamp from '../atoms/Text/RocketTimeStamp';
import RocketTimeMachineButton from '../atoms/Button/RocketTimeMachineButton';
import RocketDeleteButton from '../atoms/Button/RocketDeleteButton';
import RocketPriceGroup from '../molecules/ButtonGroup/RocketPriceGroup';
import { calculatePriceChange } from '@/app/utils/libs/stock/calculatePriceChange';
import { useMemberId } from '@/app/store/userSlice';
import { RocketCardProps } from '@/app/types/rocket';
import { deleteRocketApi } from '@/app/utils/apis/rocket';

const RocketCard: React.FC<RocketCardProps & { fetchData: () => void }> = ({ data, currentPrice, fetchData }) => {
  const { priceChange, priceChangeSign } = calculatePriceChange(data.price, currentPrice);
  const { memberId: currentMemberId } = useMemberId();
  // console.log('currentMemberId:', currentMemberId)
  const handleDelete = async () => {
    const confirmDelete = window.confirm('정말로 이 로켓을 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      // 로켓 삭제 API 호출
      await deleteRocketApi(data.rocketId, currentMemberId);
      alert('로켓이 삭제되었습니다.');
      // 삭제 후 전체 리스트 갱신
      fetchData();
    } catch (error) {
      alert('로켓 삭제에 실패했습니다.');
    }
  };

  return (
    <Content>
      <Header>
        <ProfileImageWrapper>
          <ProfileImage characterType={data.characterType} alt="프로필" />
        </ProfileImageWrapper>
        <NamePriceWrapper>
          <NameAndDelete>
            <Name>{data.nickname}</Name>
            <RocketDeleteButton
              authorId={data.memberId} // 작성자 memberId
              currentMemberId={currentMemberId} // 현재 로그인한 유저의 memberId
              onDelete={handleDelete}
            />
          </NameAndDelete>
          <RocketPriceGroup
            stockPrice={data.price}
            priceChange={priceChange} // 변동률
            priceChangeSign={priceChangeSign} // 변동률 부호
          />
        </NamePriceWrapper>
      </Header>
      <StyledRocketContent message={data.message} />
      <TimeStampTimeMachineWrapper>
        <RocketTimeStamp createdAt={data.createdAt} />
        <RocketTimeMachineButton createdAt={data.createdAt}/>
      </TimeStampTimeMachineWrapper>
    </Content>
  );
};

// 스타일 정의
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
