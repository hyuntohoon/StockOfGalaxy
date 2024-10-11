import { HiUser } from "react-icons/hi2";
import Link from 'next/link';
import styled from '@emotion/styled';
import HeaderButtonGroup from '../../HeaderButtonGroup';

const SignInButtonGroup = () => {
  return (
    <StyledLink href={"/login"}>
      <HeaderButtonGroup
        icon={<HiUser />}
        label="로그인"
      />
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`

export default SignInButtonGroup;
