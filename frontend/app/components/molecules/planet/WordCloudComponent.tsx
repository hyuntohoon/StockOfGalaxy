import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const TooltipContainer = styled.div<{ x: number; y: number }>`
  position: fixed;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  pointer-events: none;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000;
`;

const pastelColors = d3.scaleOrdinal([
  "#FF6F61", "#FF8E72", "#FFC1A1", "#CCE2CB", "#A2D5AB",
  "#A3BCE2", "#8FB1D9", "#D1A3C6", "#C97C79", "#A5B1C2"
]);


interface TooltipProps {
  x: number;
  y: number;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, text }) => {
  return <TooltipContainer x={x} y={y}>{text}</TooltipContainer>;
};

// 워드 클라우드 컨테이너 스타일
const WordCloudContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #f5f7fa;  /* 밝은 배경으로 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 워드 인터페이스 정의
interface Word {
  text: string;
  value: number;
}

// WordCloudComponent Props 인터페이스
interface WordCloudProps {
  data: Word[];
  width: number; // 가로 사이즈
  height: number; // 세로 사이즈
}

const WordCloudComponent: React.FC<WordCloudProps> = ({ data, width, height }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [words, setWords] = useState<{ text: string; x: number; y: number; size: number; rotate: number }[]>([]);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    // 최소 및 최대 글자 크기 설정
    const minSize = 20;
    const maxSize = 60;

    // value에 따른 글자 크기 조정
    const fontSizeScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.value)!, d3.max(data, d => d.value)!])
      .range([minSize, maxSize]);

    const layout = cloud<Word>()
      .size([width, height]) // props로 전달된 가로 및 세로 사이즈 설정
      .words(data.map((d) => ({
        text: d.text,
        size: fontSizeScale(d.value), // value에 따른 크기 비율 적용
      })))
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 90 : 0))
      .font('Poppins') // 모던한 폰트 사용
      .fontSize((d) => d.size*2)
      .on('end', (words) => {
        setWords(words);
      });

    layout.start();
  }, [data, width, height]);

  const handleMouseEnter = (event: React.MouseEvent<SVGTextElement, MouseEvent>, word: typeof words[0]) => {
    const { clientX, clientY } = event;
    setTooltip({
      x: clientX + 10,
      y: clientY + 10,
      text: word.text,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <WordCloudContainer>
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {words.map((word, index) => (
            <text
              key={index}
              fontSize={word.size}
              fontFamily="Poppins, sans-serif"  // 모던한 웹폰트 사용
              fontWeight="bold"
              fill={pastelColors(index.toString())}   // 파스텔톤의 그라데이션 적용
              textAnchor="middle"
              transform={`translate(${word.x},${word.y}) rotate(${word.rotate})`}
              style={{ 
                userSelect: 'none', 
                cursor: 'pointer', 
                filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))', // 부드러운 그림자 효과
                transition: 'transform 0.3s ease-out', // 애니메이션 추가
              }}
              onMouseEnter={(e) => handleMouseEnter(e, word)}
              onMouseLeave={handleMouseLeave}
            >
              {word.text}
            </text>
          ))}
        </g>
      </svg>
      {tooltip && <Tooltip x={tooltip.x} y={tooltip.y} text={tooltip.text} />}
    </WordCloudContainer>
  );
};

export default React.memo(WordCloudComponent);
