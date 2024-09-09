import { FaSearch } from "react-icons/fa";
import HeaderButtonGroup from "../../HeaderButtonGroup";

const SearchIconButtonGroup = () => {
  return (
    <HeaderButtonGroup
      icon={<FaSearch />}
      label="검색"
    />
  );
};

export default SearchIconButtonGroup;