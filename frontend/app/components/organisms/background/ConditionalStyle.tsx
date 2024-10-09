'use client'
import React, { useEffect, useState } from "react";
import { useDate } from "@/app/store/date";

const ContionalStyle: React.FC = () => {
  const { isToday } = useDate(); // useDate hook을 사용하여 isToday 값을 가져옴
  const [backgroundStyle, setBackgroundStyle] = useState<string>("");

  useEffect(() => {
    if (isToday) {
      // isToday가 true일 때 배경 스타일
      setBackgroundStyle(`
        background: #0c1f1b;
        background: -moz-linear-gradient(top, #0c1f1b 0%, #490070 100%);
        background: -webkit-linear-gradient(top, #0c1f1b 0%, #490070 100%);
        background: linear-gradient(to bottom, #0c1f1b 0%, #490070 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#11e8bb', endColorstr='#8200c9', GradientType=0);
      `);
    } else {
      // isToday가 false일 때 배경을 회색으로 설정
      setBackgroundStyle(`
        background: #1a1a1a;
        background: -moz-linear-gradient(top, #1a1a1a 0%, #555555 100%);
        background: -webkit-linear-gradient(top, #1a1a1a 0%, #555555 100%);
        background: linear-gradient(to bottom, #1a1a1a 0%, #555555 100%);
      `);
    }
  }, [isToday]); // isToday 값이 바뀔 때마다 useEffect 실행

  return (
    <style jsx global>{`
      body {
        ${backgroundStyle}
      }
    `}</style>
  );
};

export default ContionalStyle;
