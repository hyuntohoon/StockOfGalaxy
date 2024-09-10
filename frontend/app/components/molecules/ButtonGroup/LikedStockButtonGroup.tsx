import { FaStar } from "react-icons/fa";
import HeaderModalButtonGroup from "../HeaderModalButtonGroup";

const LikedStockButtonGroup = () => {
  return (
    <HeaderModalButtonGroup
      icon={<FaStar />}
      label="관심행성"
    />
  );
};
 
export default LikedStockButtonGroup;
