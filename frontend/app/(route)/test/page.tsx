'use client';

import React from 'react';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
const data = [
    { text: "개발", value: 6 },
    { text: "자바스크립트", value: 8 },
    { text: "리액트", value: 4 },
    { text: "프로그래밍", value: 5 },
    { text: "코딩", value: 4 },
    { text: "디자인", value: 4 },
    { text: "배우기", value: 4 },
    { text: "웹", value: 3 },
    { text: "앱", value: 3 },
    { text: "기술", value: 3 },
    { text: "HTML", value: 3 },
    { text: "CSS", value: 3 },
    { text: "알고리즘", value: 3 },
    { text: "문제해결", value: 2 },
    { text: "도전", value: 2 },
    { text: "창의성", value: 2 },
    { text: "열정", value: 2 },
    { text: "성장", value: 2 },
 
];
const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);
const calculateFontSize = (word) => {
    const minFontSize = 2;
    const maxFontSize = 4;
    const minValue = Math.min(...data.map(d => d.value));  // 데이터의 최소값
    const maxValue = Math.max(...data.map(d => d.value));  // 데이터의 최대값
    
    // value에 비례한 폰트 크기 계산 (2~4 사이로 비례)
    return minFontSize + ((word.value - minValue) / (maxValue - minValue)) * (maxFontSize - minFontSize);
  };

const WordCloudPage = () => {
  return (
    <div>
      
      <WordCloud 
        data={data} 
        width={100}
        height={50} 
        font="Times"
        fontStyle="italic"
        fontWeight="bold"
        fontSize={(word) => calculateFontSize(word) }
        spiral="rectangular"
        rotate={360}        
        padding={5}
        random={Math.random}
        fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
        onWordClick={(event, d) => {
        console.log(`onWordClick: ${d.text}`);
        }}
        onWordMouseOver={(event, d) => {
        console.log(`onWordMouseOver: ${d.text}`);
        }}
        onWordMouseOut={(event, d) => {
        console.log(`onWordMouseOut: ${d.text}`);
        }}
      />
    </div>
  );
};

export default WordCloudPage;
