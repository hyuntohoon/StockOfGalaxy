import { BsCalendar2CheckFill } from 'react-icons/bs';
import HeaderButtonGroup from '../../HeaderButtonGroup';

interface ReturnTodayButtonGroupProps {
  openModal: () => void;
}

const ReturnTodayButtonGroup: React.FC<ReturnTodayButtonGroupProps> = ({ openModal }) => {
  const handleClick = () => {
    openModal();  // 모달 열기
  };

  return (
    <div onClick={handleClick}>
      <HeaderButtonGroup
        icon={<BsCalendar2CheckFill />}
        label="오늘로 돌아가기"
      />
    </div>
  );
};

export default ReturnTodayButtonGroup;
