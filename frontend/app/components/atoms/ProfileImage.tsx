import Image from 'next/image';
import styled from '@emotion/styled';

const ProfileImage = ({ characterType = 1, width = 30, height = 30, alt }) => {
  return (
    <StyledProfileImage>
      <StyledImageWrapper>
      <Image
        src={`/images/profile/${characterType}.png`}
        alt={alt || 'Profile'}
        width={width}
        height={height}
      />
      </StyledImageWrapper>
    </StyledProfileImage>
  );
};

const StyledProfileImage = styled.div`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProfileImage;
