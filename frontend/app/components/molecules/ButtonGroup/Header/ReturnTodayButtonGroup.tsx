import { BsCalendar2CheckFill } from 'react-icons/bs';
import HeaderButtonGroup from '../../HeaderButtonGroup';

const ReturnTodayButtonGroup = () => {
  return (
    <HeaderButtonGroup
      icon={<BsCalendar2CheckFill />}
      label="오늘로 돌아가기"
    />
  );
};

export default ReturnTodayButtonGroup;
