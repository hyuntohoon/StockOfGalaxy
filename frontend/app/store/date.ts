import { atom, SetterOrUpdater } from 'recoil';

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

export const dateState = atom({
  key: 'dateState', // 고유 key 값
  default: getTodayDate(), // 오늘 날짜가 default 값으로 설정됨
});

// newDate: yyyymmdd 형식으로 (ex. 20240916)
// 날짜 변경 함수
export const setDate = (newDate: string, set: SetterOrUpdater<string>) => {
  set(newDate);
};
