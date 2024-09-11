'use client';

import React, { useEffect } from 'react';
import * as THREE from 'three';

interface RocketProps {
  planetRadius: number;
  scene: THREE.Scene;
  rocketCount: number;
}

export default function Rockets({ planetRadius, scene, rocketCount }: RocketProps) {
  useEffect(() => {
    const rockets: THREE.Sprite[] = [];
    const speeds: number[] = [];
    const angles: number[] = [];
    const tilts: number[] = [];
    const radius = planetRadius + 10; // 행성으로부터 로켓의 거리(공전 반지름)

    const textureLoader = new THREE.TextureLoader();
    const rocketTexture = textureLoader.load('/images/planetMain/rocket2.png');
    const rocketMaterial = new THREE.SpriteMaterial({ map: rocketTexture });

    // 로켓들을 생성하고 각기 다른 초기 값 부여
    for (let i = 0; i < rocketCount; i++) {
      const rocket = new THREE.Sprite(rocketMaterial);
      rocket.scale.set(90, 50, 1); // 로켓 크기 설정

      // 각 로켓마다 다른 초기 각도, 속도, 기울기 설정
      angles[i] = Math.random() * Math.PI * 2; // 0 ~ 2π 랜덤 각도
      speeds[i] = 0.01 + Math.random() * 0.02; // 각기 다른 속도 (0.01 ~ 0.03)
      tilts[i] = 50 + Math.random() * 40; // 기울기 (50 ~ 90 범위)

      scene.add(rocket); // 씬에 로켓 추가
      rockets.push(rocket);
    }

    // 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);

      rockets.forEach((rocket, index) => {
        // 각도를 기반으로 각 로켓의 위치 업데이트 (공전 운동)
        angles[index] += speeds[index]; // 각 로켓의 속도만큼 각도 증가

        const x = radius * Math.cos(angles[index]);
        const z = radius * Math.sin(angles[index]);
        const y = tilts[index] * Math.sin(angles[index] * 0.5); // 각기 다른 기울기 적용

        rocket.position.set(x, y, z); // 비스듬한 궤도로 위치 설정
      });
    };
    animate();

    return () => {
      // 씬에서 로켓들 제거
      rockets.forEach((rocket) => scene.remove(rocket));
    };
  }, [planetRadius, scene, rocketCount]);

  return null;
}
