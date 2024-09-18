// WordCloudComponent.tsx
import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const TooltipContainer = styled.div<{ x: number; y: number }>`
  position: fixed; /* absolute에서 fixed로 변경 */
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  pointer-events: none;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1000; /* 툴팁이 다른 요소들 위에 표시되도록 설정 */
`;

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
`;

// 워드 인터페이스 정의
interface Word {
  text: string;
  value: number;
}

// WordCloudComponent Props 인터페이스
interface WordCloudProps {
  data: Word[];
}
const WordCloudComponent: React.FC<WordCloudProps> = ({ data }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [words, setWords] = useState<
      { text: string; x: number; y: number; size: number; rotate: number }[]
    >([]);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  
    useEffect(() => {
      // 워드 클라우드 레이아웃 설정
      const layout = cloud<Word>()
        .size([500, 400]) // SVG의 너비와 높이를 설정
        .words(
          data.map((d) => ({
            text: d.text,
            size: d.value * 10, // 단어 크기 스케일링 (필요에 따라 조정)
          }))
        )
        .padding(5) // 단어 간 간격
        .rotate(() => (Math.random() > 0.5 ? 90 : 0)) // 0도 또는 90도로 회전
        .font('Impact') // 폰트 설정
        .fontSize((d) => d.size)
        .on('end', (words) => {
          setWords(words);
        });
  
      layout.start();
    }, [data]);
  
    // 마우스 이벤트 핸들러
    const handleMouseEnter = (event: React.MouseEvent<SVGTextElement, MouseEvent>, word: typeof words[0]) => {
      const { clientX, clientY } = event;
      setTooltip({
        x: clientX + 10, // 툴팁 위치 조정
        y: clientY + 10,
        text: word.text,
      });
    };
  
    const handleMouseLeave = () => {
      setTooltip(null);
    };
  
    return (
      <WordCloudContainer>
        <svg ref={svgRef} width="500" height="440">
          <g transform={`translate(250,220)`}> {/* SVG 중앙으로 단어 위치 조정 */}
            {words.map((word, index) => (
              <text
                key={index}
                fontSize={word.size}
                fontFamily="Impact"
                fill="#61dafb"
                textAnchor="middle"
                transform={`translate(${word.x},${word.y}) rotate(${word.rotate})`}
                style={{ userSelect: 'none', cursor: 'pointer' }} // 커서 변경
                onMouseEnter={(e) => {handleMouseEnter(e, word); console.log(word)}}
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
  
  // React.memo로 감싸서 리렌더링 방지
  export default React.memo(WordCloudComponent);