import React from 'react';
import styled from '@emotion/styled';
import { News } from '@/app/types/planet';
import { IoClose } from 'react-icons/io5';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 600px;
  width: 90%;
  position: relative;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
`;

const NewsModal: React.FC<{ news: News; onClose: () => void }> = ({ news, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}><IoClose /></CloseButton>
        <h2>{news.title}</h2>
        <p>발행일: {new Date(news.publishDate).toLocaleDateString('ko-KR')}</p>
        <img src={news.thumbnailImg} alt={news.title} />
        <p>{news.content}</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewsModal;
