// page.tsx
'use client';

import React, {useEffect} from 'react';
import NewsPageHeaderTemplate from '@/app/components/templates/planet/NewsPageHeaderTemplate'; 
import { todayNewsApi } from '@/app/utils/apis/news';
import { useRecoilValue } from 'recoil';
import { dateState } from '@/app/store/date';

const NewsPage: React.FC = () => {

  const todayDate = useRecoilValue(dateState);

  useEffect(() => {
    const res = todayNewsApi(todayDate);
    console.log(res);

  } , [])

  return (
    <>
      <div></div>
    </>
  );
};

export default NewsPage;
