import Image from 'next/image';
import styled from 'styled-components';

const ProfileImage = ({ src, alt }) => {
  return (
    <StyledProfileImage>
      <StyledImageWrapper>
        <Image src={src} alt={alt || 'Profile'} width={34} height={34} />
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
