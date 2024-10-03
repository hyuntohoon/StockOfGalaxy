import { FaSearch, FaStar } from "react-icons/fa";
import HeaderButtonGroup from "../../HeaderButtonGroup";
import Link from 'next/link';
import styled from '@emotion/styled';

const SearchIconButtonGroup = () => {

  return (
    <div
    >
      <StyledLink href={`/search`}>
    <HeaderButtonGroup
          icon={<FaSearch />}
          label="검색"
    />
    </StyledLink>
    </div>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`

export default SearchIconButtonGroup;