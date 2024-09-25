// Modal.tsx
import React from 'react';
import { NewsDetail } from '@/app/types/News'; // 뉴스 상세 타입 임포트
import { ModalOverlay, ModalContent } from '@/app/styles/planet';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsDetail: NewsDetail | null; // newsDetail을 null로 허용
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, newsDetail }) => {
  if (!isOpen || !newsDetail) return null; // newsDetail이 없는 경우 처리

  const { news, keywords } = newsDetail; // 뉴스 정보와 키워드 추출

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{news.title}</h2> 
        <div className="news-meta">
          <p> {news.writeDate}</p>
          <p> {news.newspaper}</p>
        </div>
        <div className="keywords">
          {keywords.map((keyword, index) => (
            <span key={index} className="keyword">{keyword}</span>
          ))}
        </div>
        <div className="news-header">
          <Image src={news.img} alt={news.title} width={300} height={300} />
          <div>
            <p>{news.content}</p>
          </div>
        </div>
        
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
