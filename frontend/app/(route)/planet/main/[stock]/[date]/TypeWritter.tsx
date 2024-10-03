'use client';

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
  flex-direction: column;
  color: #ffffffd1;
`;

const Heading = styled.h3`
  color: white;
  font-size: 2em;
  margin-bottom: 20px;
`;

const typing = (length: number, duration: number) => keyframes`
  from { width: 0; }
  to { width: ${length}ch; }
`;

const blinkCaret = keyframes`
  from, to { border-color: transparent; }
  50% { border-color: white; }
`;

interface TypeWriterTextProps {
  length: number;
  typingDuration: number;
}

const TypeWritterText = styled.div<TypeWriterTextProps>`
  width: fit-content;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.15em solid white;
  ${({ length, typingDuration }) => css`
    animation: ${typing(length, typingDuration)} ${typingDuration}ms steps(${length}, end),
               ${blinkCaret} 0.75s step-end infinite;
  `};
  color: white;
  font-size: 1.2em;
`;

// todo: 시연 전에는 5개 정도로 줄이기
const messages = [
  "우주에서는 아무도 소리를 들을 수 없어요, 왜냐하면 소리가 전달될 공기가 없거든요.",
  "지구에서 밤하늘에 보이는 별들은 이미 수백, 수천 년 전에 빛을 발한 것들이에요.",
  "우주의 가장 큰 별은 태양의 1700배나 크지만 밀도는 훨씬 낮아요.",
  "지구에서 가장 가까운 블랙홀은 1,500광년 떨어져 있어요.",
  "우주에서는 물체가 계속 떠다니고, 아무런 힘이 가해지지 않으면 멈추지 않아요.",
  "금성에서는 태양이 서쪽에서 뜨고 동쪽에서 져요.",
  "우주에는 떠다니는 행성들이 있는데, 이들은 어떤 별 주위도 돌지 않고 혼자 떠다녀요.",
  "우주에는 아주 희귀한 다이아몬드 행성이 있을지도 몰라요.",
  "블랙홀 근처에서는 시간이 아주 천천히 흘러요.",
  "우주에는 보이지 않는 '암흑 물질'이 있는데, 우주 물질의 85%가 이걸로 이루어져 있어요.",
  "중성자별은 아주 작지만, 그 밀도는 엄청나서 작은 중성자별 한 개가 수십억 톤의 무게를 가질 수 있어요.",
  "달에서 뛰면 지구보다 6배 더 높이 뛸 수 있어요.",
  "국제 우주정거장은 시속 약 28,000km로 지구를 돌고 있어요.",
  "우주에서는 눈물을 흘리면, 눈물이 얼굴에 붙어서 흐르지 않아요.",
  "태양이 사라진다면, 우리는 8분 동안 그 사실을 몰라요. 태양빛이 지구까지 오는데 8분 걸리니까요.",
  "우주에서 몸은 길어져서 키가 약 5cm 정도 커질 수 있어요.",
  "지구는 매일 약 100톤의 우주 먼지를 모으고 있어요.",
  "우주 비행사들은 우주에서 '금속' 맛을 느낀다고 해요.",
  "우주에서는 물체가 저절로 식지 않아요. 열이 전달될 공기가 없기 때문이에요.",
  "목성의 위성 중 하나인 이오에서는 끊임없이 화산이 폭발해요.",
  "우주에서는 사람의 심장 모양이 둥글게 변할 수 있어요.",
  "우주에서 빠르게 움직일수록 시간이 더 느리게 가요.",
  "지구는 태양계의 유일한 '살아있는' 행성이에요, 왜냐하면 지구는 아직도 지질 활동을 하고 있거든요.",
  "우주에서 던져진 도구는 영원히 계속 떠다닐 수 있어요.",
  "목성의 대적점은 지구보다 큰 크기의 폭풍이 몇 백 년 동안 지속되고 있어요.",
  "은하수는 매초 7개의 별을 만들어내요.",
  "우주에서 가장 큰 산은 화성의 올림푸스 몬스로, 에베레스트보다 3배나 높아요.",
  "중력 없이 물은 공 모양으로 떠다녀요.",
  "태양은 지구에서 보이는 크기와 똑같은 크기로 토성에서도 보여요.",
  "금성은 태양계를 거꾸로 도는 유일한 행성이에요.",
  "우주에서 매일 수십억 개의 별이 폭발하는 '초신성' 현상이 일어나요.",
  "우주에서 블랙홀에 가까워질수록 시간이 느리게 흘러요.",
  "우주에서는 뼈와 근육이 약해지기 때문에 매일 운동을 꼭 해야 해요.",
  "우주 비행사들은 지구로 돌아오면 지구 중력에 적응하는 데 몇 주가 걸려요.",
  "우주에는 '시간 여행'처럼 시간에 영향을 미치는 현상들이 실제로 일어나요.",
  "우주에서는 물이 자유롭게 움직이지 않기 때문에 샤워하는 것이 거의 불가능해요.",
  "지구에서 보이지 않는 우주 먼지들이 태양계를 떠돌아다니며 반짝여요.",
  "혜성은 태양 가까이에 다가가면 얼음이 녹으면서 긴 꼬리를 만들어요.",
  "우주정거장에서 본 지구의 일출은 하루에 16번이나 일어나요.",
  "우주에는 '유령 은하'라고 불리는 희미한 은하들이 있어요.",
  "태양은 약 50억 년 후에 완전히 연료를 소진할 거예요.",
  "태양계에는 8개의 행성이 있지만, 다른 은하계에는 수많은 미지의 행성들이 있을 거예요.",
  "우주에 있는 중성자별의 한 스푼은 지구 전체의 산보다 무거울 수 있어요.",
  "우주에서 떠다니는 먼지 알갱이들은 지구에서 보는 별똥별을 만들어요.",
  "명왕성은 태양 주위를 한 바퀴 도는 데 248년이나 걸려요.",
  "우주에는 매일 새로운 별들이 태어나고 있어요.",
  "블랙홀은 시간이 멈춘 것처럼 보이게 만들 수 있어요.",
  "우리 은하는 약 1000억 개의 별로 이루어져 있어요, 그중 몇 개는 아주 오래전에 빛을 잃었어요.",
  "화성에서는 모래폭풍이 몇 달 동안 지속될 수 있어요.",
  "우주의 어떤 곳에서는 물 대신 '액체 메탄'이 비처럼 내리기도 해요."
];


const TypeWritter = ({ onFinish }) => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]); // 기본 메시지 설정
  const messageLength = currentMessage.length;
  const typingDuration = messageLength * 50;

  useEffect(() => {
    // 클라이언트 사이드에서만 랜덤 메시지 선택
    const randomIndex = Math.floor(Math.random() * messages.length);
    setCurrentMessage(messages[randomIndex]);

    const timer = setTimeout(() => {
      onFinish();
    }, typingDuration+1500);

    return () => clearTimeout(timer);
  }, [onFinish, typingDuration]);

  return (
    <LoadingContainer>
      <Heading>알고 계셨나요?</Heading>
      <TypeWritterText length={messageLength} typingDuration={typingDuration}>
        {currentMessage}
      </TypeWritterText>
    </LoadingContainer>
  );
};

export default TypeWritter;
