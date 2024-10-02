import React from 'react';
import { NewsDetail } from '@/app/types/planet'; // 뉴스 상세 타입 임포트
import { ModalOverlay, ModalContent } from '@/app/styles/planet';
import Image from 'next/image';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsDetail: NewsDetail | null; // newsDetail을 null로 허용
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, newsDetail }) => {
  if (!isOpen || !newsDetail) return null; // newsDetail이 없는 경우 처리

  const { title, content, publishedDate, newsLink, thumbnailImg } = newsDetail; // 뉴스 상세 정보 추출

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2> 
        <div className="news-meta">
          <p>발행일: {new Date(publishedDate).toLocaleDateString('ko-KR')}</p>
          <a href={newsLink} target="_blank" rel="noopener noreferrer">기사 링크</a>
        </div>
        <div className="news-header">
          <Image src={thumbnailImg} alt={title} width={300} height={300} />
          <div>
            <p>{content}</p>
          </div>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
