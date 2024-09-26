import { atom, SetterOrUpdater } from 'recoil';

const getTodayDate = () => {
  return new Date();
};

export const dateState = atom({
  key: 'dateState', // 고유 key 값
  default: getTodayDate(), // 오늘 날짜를 default 값으로 설정
});

// 날짜 변경 함수
export const setDate = (newDate: Date, set: SetterOrUpdater<Date>) => {
  set(newDate); // Date 객체 그대로 상태 업데이트
};
