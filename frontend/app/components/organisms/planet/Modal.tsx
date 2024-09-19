import React from 'react';
import { NewsDetail } from '@/app/types/News'; // 뉴스 상세 타입 임포트
import { ModalOverlay, ModalContent } from '@/app/styles/planet';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsDetail: NewsDetail; // newsDetail 타입 추가
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, newsDetail }) => {
  if (!isOpen) return null;

  const { news, keywords } = newsDetail; // 뉴스와 키워드 추출

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{news.title}</h2>
        <p>{news.content}</p>
        <p>작성일: {news.write_date}</p>
        <p>신문사: {news.신문사}</p>
        <p>키워드: {keywords.join(', ')}</p> {/* 키워드 표시 */}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
