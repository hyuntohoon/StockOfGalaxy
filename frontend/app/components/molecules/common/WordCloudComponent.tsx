import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
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

interface TooltipProps {
  x: number;
  y: number;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ x, y, text }) => {
  return (
    <TooltipContainer x={x} y={y}>
      {text}
    </TooltipContainer>
  );
};

// 워드 클라우드 컨테이너 스타일
const WordCloudContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// Word 인터페이스 정의 (x, y, rotate 속성 추가)
interface Word {
  text: string;
  value: number;
  x: number;      // x 좌표 추가
  y: number;      // y 좌표 추가
  rotate: number; // 회전 각도 추가
}

// WordCloudComponent Props 인터페이스
interface WordCloudProps {
  data: Word[]; // data는 Word 배열
  width: number; // 가로 사이즈
  height: number; // 세로 사이즈
}

const WordCloudComponent: React.FC<WordCloudProps> = ({
  data,
  width,
  height,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [words, setWords] = useState<Word[]>([]); // 변경된 Word 타입으로 설정
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    const layout = cloud<Word>()
      .size([width, height]) // props로 전달된 가로 및 세로 사이즈 설정
      .words(data.map((d) => ({
        text: d.text,
        value: d.value,
        size: d.value * 10, // value에 기반하여 size 계산
      })))
      .padding(5)
      .rotate(() => (Math.random() > 0.5 ? 90 : 0))
      .font("Impact")
      .fontSize((d) => d.size)
      .on("end", (words) => {
        // 'words'는 { text, x, y, rotate } 속성을 가지도록 설정됩니다.
        setWords(words as Word[]); // 타입 변환
      });

    layout.start();
  }, [data, width, height]);

  const handleMouseEnter = (
    event: React.MouseEvent<SVGTextElement, MouseEvent>,
    word: Word
  ) => {
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
              fontSize={word.value * 10} // size를 value에 기반하여 설정
              fontFamily="Impact"
              fill="#61dafb"
              textAnchor="middle"
              transform={`translate(${word.x},${word.y}) rotate(${word.rotate})`}
              style={{ userSelect: "none", cursor: "pointer" }}
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

// React.memo로 감싸서 리렌더링 방지
export default React.memo(WordCloudComponent);
