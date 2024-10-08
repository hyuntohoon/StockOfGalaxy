'use client';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/navigation'; // useRouter 임포트
import { useDate } from '@/app/store/date';

// 비디오 컨테이너 스타일
const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh; // 비디오를 전체 화면으로 설정
  overflow: hidden; // 넘치는 내용 숨기기
`;

// 비디오 스타일
const FullscreenVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: fill; // 비디오가 화면에 맞게 커지도록 설정
  transform: translate(-50%, -50%); // 비디오 중앙에 위치
`;

// 시작 버튼 스타일
const StartButton = styled.button<{ isVisible: boolean }>`
  position: absolute;
  bottom: 5%; // 위에서 50% 위치에 오도록
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent; // 배경 투명
  border: none;
  border-radius: 50%; // 둥글게
  cursor: pointer;
  opacity: ${(props) => (props.isVisible ? '0.8' : '0')}; // 처음에는 보이지 않음
  transition: top 2s ease, opacity 2s ease; // 스르륵 올라오는 애니메이션

  ${(props) => props.isVisible && `
    animation: float 2s ease-in-out infinite; // 둥실둥실 애니메이션
  `}

  @keyframes float {
    0% {
      transform: translate(-50%, -50%) translateY(0);
    }
    50% {
      transform: translate(-50%, -50%) translateY(-5px); // 위로 5px 이동
    }
    100% {
      transform: translate(-50%, -50%) translateY(0);
    }
  }
`;

// 시작 아이콘 스타일
const StartIcon = styled.img`
  width: 180px; // 아이콘 크기 조정
  height: 150px; // 아이콘 크기 조정
`;

export default function Home() {
  const [isButtonVisible, setButtonVisible] = useState(false);
  const router = useRouter(); // useRouter 훅 사용
  const {date} = useDate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonVisible(true); // 8초 후 버튼을 보이도록 설정
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 클리어
  }, []);

  const handleStartClick = () => {
    router.push(`/main/${date}`); // 버튼 클릭 시 /main으로 이동
  };

  return (
    <VideoContainer>
      <FullscreenVideo autoPlay muted>
        <source src="/videos/main_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </FullscreenVideo>
      <StartButton isVisible={isButtonVisible} onClick={handleStartClick}>
        <StartIcon src="/images/start.svg" alt="Start" />
      </StartButton>
    </VideoContainer>
  );
}
