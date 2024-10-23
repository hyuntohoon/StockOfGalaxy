import Image from 'next/image';
import styled from '@emotion/styled';

interface RocketAuthorProfileProps {
  src: string;
  alt?: string;
  nickname: string;
}

const RocketAuthorProfile = ({ src, alt, nickname }) => {
  return (
    <ProfileContainer>
      <ProfileImage>
        <Image src={src} alt={alt || 'Profile'} width={34} height={34} />
      </ProfileImage>
      <Nickname>{nickname}</Nickname>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 49px;
`;

const ProfileImage = styled.div`
  width: 42px;
  height: 42px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nickname = styled.span`
  margin-top: 5px;
  color: #333;
  font-weight: bold;
  font-size: 14px;
`;

export default RocketAuthorProfile;
