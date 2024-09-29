import { FaStar } from "react-icons/fa";
import HeaderModalButtonGroup from "../HeaderModalButtonGroup";
import Link from "next/link";

const LikedStockButtonGroup = () => {
  return (
    <Link href="/myplanet" style={{ textDecoration: "none" }}>
    <HeaderModalButtonGroup
      icon={<FaStar />}
      label="관심행성"
    />
    </Link>
  );
};
 
export default LikedStockButtonGroup;
