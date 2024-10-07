import { BsCalendar2CheckFill } from 'react-icons/bs';
import HeaderButtonGroup from '../../HeaderButtonGroup';
import { useDate } from '@/app/store/date';
import { useRouter } from 'next/navigation'; // next/navigation에서 useRouter 가져오기

const ReturnTodayButtonGroup = () => {
  const {setDate} = useDate();
  const router = useRouter(); // useRouter를 import하여 router 객체를 받아오기

  const handleClick = () => {
    const today = new Date(); // 로컬 시간으로 오늘 날짜 가져오기
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}${month}${day}`;
    setDate(formattedDate); // 날짜 설정
    alert("오늘 날짜로 이동합니다");
    router.push(`/main/${formattedDate}`); // 오늘 날짜로 이동
  };
  return (
    <div onClick={handleClick}>
    <HeaderButtonGroup
      icon={<BsCalendar2CheckFill />}
      label="오늘로 돌아가기"
    /></div>
  );
};

export default ReturnTodayButtonGroup;
