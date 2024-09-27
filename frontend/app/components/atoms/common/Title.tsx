import { alef } from '@/public/fonts';

interface TitleProps {
  text: string;
  size: number;
  color?: string;    // 색상을 지정할 수 있도록 선택적 프로퍼티 추가
  weight?: number;   // 글꼴 굵기를 지정할 수 있도록 선택적 프로퍼티 추가
}

const Title: React.FC<TitleProps> = ({ text, size, color = '#000', weight = 400 }) => {
  return (
    <div
      className={alef.className}
      style={{ 
        fontSize: `${size}px`, 
        color: color,         // 전달된 색상 적용
        fontWeight: weight,  // 전달된 글꼴 굵기 적용
        padding: '10px',
      }}
    >
      {text}
    </div>
  );
}

export default Title;
