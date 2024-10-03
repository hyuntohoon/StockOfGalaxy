import { atom, SetterOrUpdater } from 'recoil';
import { getTodayDate } from '../utils/libs/getTodayDate';
import { useRecoilState } from 'recoil';

export const dateState = atom({
  key: 'dateState', // 고유 key 값
  default: getTodayDate(), // default 값은 오늘 날짜
});


// // newDate: yyyymmdd 형식으로 (ex. 20240916)
// // 날짜 변경 함수
// export const setDate = (newDate: string, set: SetterOrUpdater<string>) => {
//   set(newDate);
// };

export const useDate = () => {
  const [date, setDate] = useRecoilState(dateState);
  return { date, setDate };
}