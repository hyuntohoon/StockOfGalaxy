import { HiUser } from "react-icons/hi2";
import HeaderButtonGroup from '../../HeaderButtonGroup';

interface MyIconButtonGroupProps {
  onClick: () => void;
}

const MyIconButtonGroup = ({ onClick }: MyIconButtonGroupProps) => {
  return (
    <div onClick={() => {
      onClick();
    }}>
      <HeaderButtonGroup
        icon={<HiUser />}
        label="MY"
      />
    </div>
  );
};

export default MyIconButtonGroup;
