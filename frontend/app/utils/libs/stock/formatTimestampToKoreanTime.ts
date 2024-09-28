const formatTimeStamp = (timeStamp) => {
  const date = new Date(timeStamp); // 타임스탬프를 인자로 받아 Date 객체 생성

  // 생성한 Date 객체에서 년, 월, 일, 시, 분, 초를 각각 문자열로 추출
  const year = date.getFullYear().toString(); // 년도
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // 월 2자리 (01, 02 ... 12)
  const day = ("0" + date.getDate()).slice(-2); // 일 2자리 (01, 02 ... 31)
  const hour = ("0" + date.getHours()).slice(-2); // 시 2자리 (00, 01 ... 23)
  const minute = ("0" + date.getMinutes()).slice(-2); // 분 2자리 (00, 01 ... 59)
  const second = ("0" + date.getSeconds()).slice(-2); // 초 2자리 (00, 01 ... 59)

  // 형식화된 문자열 생성
  const formattedDateTime = [year, month, day, hour, minute, second];

  return formattedDateTime;
};

export default formatTimeStamp;
