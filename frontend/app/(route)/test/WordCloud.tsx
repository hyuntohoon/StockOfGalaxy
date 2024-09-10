'use client'
import React, { useState, useEffect, useRef } from 'react';

interface WordCloudProps {
    size?: number;
    width?: number;
    height?: number;
    words: WordType[];
    shape?: any;
    random?: boolean;
}

export interface WordType {
    word: string,
    value: number
}

interface ResultType {
    x: number,
    y: number,
    word: string,
    direction?: string,
    size: number;
}

const WordCloud: React.FC<WordCloudProps> = ({ size = 2, width = 50, height = 50, words, shape, random }) => {
    const [resultList, setResultList] = useState<ResultType[]>([]);
    const [modeColor, setModeColor] = useState<number>(255);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const backgroundShape = useRef<HTMLImageElement | null>(null);
    const visitedBuffer = Array.from(Array(width), () => new Array(height).fill(0));

    useEffect(() => {
        resetCanvas();
        if (shape) {
            loadBackgroundShape(shape);
        } else {
            generateWordCloud();
        }
    }, [words]);

    const loadBackgroundShape = (resource: any) => {
        const image = new Image();
        image.src = resource;
        image.width = width;
        image.height = height;
        image.onload = generateWordCloud;
        backgroundShape.current = image;
    };

    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);  // 캔버스를 초기화
              }
        }
    };

    const generateWordCloud = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        createWordCloud(ctx, canvas);
    };

    const createWordCloud = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
        let wordData = words.slice();
        if (!random) {
            wordData = wordData.sort((a, b) => b.value - a.value);
        }
        if (shape && backgroundShape.current) {
            ctx.drawImage(backgroundShape.current, 0, 0);
        }
        const canvasBitmap = checkBitmap(canvas, ctx);
        const newResultList: ResultType[] = [];

        wordData.forEach((w, idx) => {
            const fontSize = Math.max(w.value, 10 / size);
            ctx.font = `${fontSize}px sans-serif`;
            const textWidth = ctx.measureText(w.word).width * 0.85;
            const textHeight = fontSize + 0.5;

            let visitedCheckerBFS = visitedBuffer.map(v => v.slice());
            const canvasWidth = width - textWidth;
            const canvasHeight = height - textHeight;

            if (idx % 2 === 0) {
                const { x, y, isFind } = calculateXY(canvasBitmap, w, canvasHeight, canvasWidth, visitedCheckerBFS, textWidth, textHeight);
                if (isFind) {
                    drawWord(canvas, ctx, w, x, y, 'vertical');
                    newResultList.push({
                        x,
                        y,
                        word: w.word,
                        direction: 'vertical',
                        size: w.value,
                    });
                }
            } else {
                const { x, y, isFind } = calculateXY(canvasBitmap, w, canvasWidth, canvasHeight, visitedCheckerBFS, textHeight, textWidth);
                if (isFind) {
                    drawWord(canvas, ctx, w, x, y, 'horizontal');
                    newResultList.push({
                        x,
                        y,
                        word: w.word,
                        direction: 'horizontal',
                        size: w.value,
                    });
                }
            }
        });
        setResultList(newResultList);
    };

    const checkBitmap = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const canvasBitmap = Array.from(Array(width), () => new Array(height).fill(0));
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const bitmapArr = Array.from(imageData.data.subarray((row * imageData.width + col) * 4, (row * imageData.width + col) * 4 + 4));
                const bitmapSum = bitmapArr.reduce((acc, curr) => acc + curr, 0);
                canvasBitmap[row][col] = bitmapSum;
            }
        }
        const modeBitmapColor = Object.keys(canvasBitmap).reduce((prev, curr) => (
            canvasBitmap[curr as any] > canvasBitmap[prev as any] ? curr : prev
          ), Object.keys(canvasBitmap)[0]);  // 초기값을 첫 번째 키로 설정
        setModeColor(parseInt(modeBitmapColor));
        return canvasBitmap;
    };

    const calculateXY = (canvasBitmap: number[][], w: WordType, canvasHeight: number, canvasWidth: number, visited: number[][], size1: number, size2: number) => {
        const moveXY = [{ x: 0, y: -1 }, { x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: -1, y: 0 }, { x: -1, y: -1 }];
        let x = Math.floor(canvasWidth / 2);
        let y = Math.floor(canvasHeight / 2);
        const queue = [{ xPos: x, yPos: y }];
        visited[y][x] = 1;
        let isFind = false;

        while (queue.length) {
            const { xPos, yPos } = queue.shift() || {};
            for (let i = 0; i < moveXY.length; i++) {
                const nextX = (xPos || 0) + moveXY[i].x * 2;
                const nextY = (yPos || 0) + moveXY[i].y * 2;
                if (nextY >= 0 && nextY < canvasHeight && nextX >= 0 && nextX < canvasWidth) {
                    if (visited[nextY][nextX] === 0 && canvasBitmap[nextY][nextX] === modeColor) {
                        visited[nextY][nextX] = 1;
                        queue.push({ xPos: nextX, yPos: nextY });
                        if (checkDFS(canvasBitmap, nextX, nextY, size1, size2, visited)) {
                            x = nextX;
                            y = nextY;
                            isFind = true;
                            break;
                        }
                    }
                }
            }
        }
        return { x, y, isFind };
    };

    const checkDFS = (
        canvasBitmap: number[][], 
        startX: number, 
        startY: number, 
        height: number, 
        width: number, 
        visited: number[][]
      ): boolean => {
          if (startX < 0 || startX >= width || startY < 0 || startY >= height || canvasBitmap[startY][startX] > 0) return false;
          if (visited[startY][startX] === 1) return true;
          visited[startY][startX] = 1;
          return checkDFS(canvasBitmap, startX + 1, startY, height, width, visited) || 
                 checkDFS(canvasBitmap, startX, startY + 1, height, width, visited);
      };

    const drawWord = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, word: WordType, x: number, y: number, direction: string) => {
        ctx.save();
        if (direction === 'vertical') {
            ctx.translate(x, y);
            ctx.rotate(Math.PI / 2);
            ctx.fillStyle = '#000';  // 글자 색상 설정
            ctx.fillText(word.word, 0, 0);
        } else {
            ctx.fillText(word.word, x, y);
        }
        ctx.restore();
    };

    return (
        <div>
            <canvas ref={canvasRef} width={width} height={height} style={{ display: 'block' }} />
            <svg width={width * size} height={height * size}>
                <g>
                    {resultList.map((result, i) => (
                        <text
                            key={i}
                            x={result.x * size}
                            y={result.y * size}
                            style={{
                                fontSize: Math.max(result.size * size, 10),
                                fill: '#000',
                            }}
                            transform={result.direction === 'vertical' ? `rotate(90, ${result.x}, ${result.y})` : ''}
                        >
                            {result.word}
                        </text>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default WordCloud;
