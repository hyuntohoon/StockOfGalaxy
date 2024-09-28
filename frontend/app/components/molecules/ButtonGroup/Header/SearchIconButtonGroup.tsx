import { FaSearch, FaStar } from "react-icons/fa";
import HeaderButtonGroup from "../../HeaderButtonGroup";
import Link from 'next/link';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil'; 
import {dateState} from "@/app/store/date";

const SearchIconButtonGroup = () => {
  const date = useRecoilValue(dateState);

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